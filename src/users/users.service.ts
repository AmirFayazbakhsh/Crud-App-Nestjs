import { ForbiddenException, Injectable, Logger, Res } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()


export class usersService {

    constructor(
        private prisma:PrismaService,
        private jwt: JwtService,
         private configService:ConfigService
         ){}

    async register(data : UsersDto){

        //password hash
        const hash = await argon.hash(data.password);
        

        try{          
                
            //save data
            const user = await this.prisma.users.create({

                data : {
                    name: data.name,
                    email : data.email,
                    password : hash
                }
            });

            return this.signToken(user.id , user.email);

               
            

           
        }catch(error){

            if (error instanceof PrismaClientKnownRequestError) {

                if (error.code === 'P2002') {
                    throw new ForbiddenException('user with this email exist');
                }
            }
        }

    }


    async login(data : UsersDto){

        //find user by email
        const user = await this.find(data.email);
        if(user){

            //password validate
            const pwMatch = await argon.verify(user.password,data.password);
            if(!pwMatch){
                throw new ForbiddenException("password is wrong");
            }

            return this.signToken(user.id , user.email);

        }else{

            throw new ForbiddenException("user does not exist");
        }

    }



    async signToken(userId:number , email : string): Promise<{access_token:string}>{       

        const payload = {
            sub: userId,
            email,
        };

        const secret = this.configService.get('JWT_SECRET');

        const token = await this.jwt.signAsync(payload, {
            expiresIn : '60m',
            secret : secret
        });

        return {
            access_token : token,
        }

         

    }


    async find(email : string) {
    
        const user = await this.prisma.users.findUnique(
            {
                where: {
                    email : email,
                },

            }
        );

        delete user.password;
        return user;
    }

}