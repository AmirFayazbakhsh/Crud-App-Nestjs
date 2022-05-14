import { Body, Controller, Get , Post, Req } from "@nestjs/common"
import { ProductsService } from "./products.service";
import { Request } from "express";
@Controller('products')

export class ProductsController{

    constructor (private products: ProductsService){}


    @Get()
    getProducts(@Req() request: Request) {
        
        console.log('controller page');
        
        return this.products.sayhello();
    }



    @Post()
    addProduct(@Req() request: Request) : any {
        return this.addProduct(request);
    }


}

