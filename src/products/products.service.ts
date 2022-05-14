import { Injectable } from '@nestjs/common';

@Injectable()

export class ProductsService{

    sayhello(): string {
        console.log('servic page');
        
        return "hello";
    }

    addProduct(name :string , price : number): any{

    }
}