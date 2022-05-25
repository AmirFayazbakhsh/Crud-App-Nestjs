import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { usersController } from "../users.controller";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt'){

    constructor(config : ConfigService){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET'),
        });
    }

    async validate (payload:{
        sub : number,
        email: string
    })
    {

        return payload;
    
    }

}