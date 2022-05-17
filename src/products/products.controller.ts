import { Body, Controller, Delete, Get , Param, ParseIntPipe, Patch, Post, Req } from "@nestjs/common"
import { ProductsService } from "./products.service";
import { Request } from "express";
// import {} from ""
@Controller('products')

export class ProductsController{

    constructor (private products: ProductsService){}

    //get all data
    @Get()
    getProducts() {
        return this.products.getAll();
    }

    // get single data by id
    @Get(':id')
    getProduct(@Param('id',ParseIntPipe) proId : number){     
        return this.products.getById(proId);
    }

    //insert data
    @Post()
    addProduct(@Body() data : any){
        return  this.products.insert(data);
    }




    // update data
    @Patch(':id')
    updateProduct(@Param('id',ParseIntPipe) proId :number , @Body() data : any){
        return this.products.update(proId,data);
    }



    //delete data
    @Delete(':id')
    removeProduct(@Param('id',ParseIntPipe) proId :number){
        return this.products.delete(proId);
    }





}

