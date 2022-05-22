import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prisma.module';
import { usersModule } from './users/users.module';

@Module({
  imports: [ProductsModule,PrismaModule,ConfigModule.forRoot({isGlobal : true}),usersModule],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
