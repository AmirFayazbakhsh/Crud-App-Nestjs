import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from './strategy';

import { usersController } from './users.controller';
import { usersService } from './users.service';

@Module({
  imports: [PrismaModule,JwtModule.register({})],
  controllers: [usersController],
  providers: [usersService,PrismaService,JwtStrategy],
  exports : [usersService]
  
})
export class usersModule {}
