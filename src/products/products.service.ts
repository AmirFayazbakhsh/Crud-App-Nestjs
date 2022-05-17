import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
// import { send } from 'process';
import { Product } from './product.model';

@Injectable()

export class ProductsService{

    constructor(
      private prisma: PrismaService,

      private config: ConfigService,
    ) {}



    //get all products 
    async getAll(){
        const products = await this.prisma.products.findMany();
        return [...products];
    }




    //get single product
    async getById(proId){
                
        const product = await this.prisma.products.findUnique(
            {
                where:{
                    id : proId,
                },
            }
    
        );
        
        if(product){

            return {...product};

        }else{

            throw new NotFoundException(' Product was not exist');
        }

    }



    // insert product
    async insert(data : any){

        const product = await this.prisma.products.create({

            data: {
                title: data.title,
                description: data.description,
                price: data.price
            }

        });

        return product;
    }

    



    //Update product
    async update(proId,data : any){

        const product = await this.getById(proId);
       
        if(product){

            try{

                const updateProduct = await this.prisma.products.update({
                    where :{
                        id : proId,
                    },
    
                    data :{
                        title : data.title,
                        description : data.description,
                        price : data.price
                    }
                });

                return "product updated successfully";

            }catch(error){

                return "faild update product";
            }
            
        }else{

            throw new NotFoundException(' Product was not exist');
        }

    }


    // delete product
    async delete(proId){

        const product = await this.getById(proId);
        if(product){

            try{

                const deleteProduct = await this.prisma.products.delete({
                    where : {
                        id : proId,
                    },
                });

                return "product successfully deleted";

            }catch(error){

                return "faild delete product";
            }

        }else{

            throw new NotFoundException(' Product was not exist');
        }
    }


}