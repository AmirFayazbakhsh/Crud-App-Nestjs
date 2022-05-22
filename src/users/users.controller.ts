import { Body, Controller, Get, Param , Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersDto } from './dto';
import { Request } from 'express';
import { usersService } from './users.service';
import { JwtGuard } from './guard';

@Controller('users')

export class usersController {
  constructor(private users: usersService) {}

  //signup
  @Post('signup')
  signup(@Body() data : UsersDto){
    return this.users.register(data);
  }

  //signin
  @Post('signin')
  signin(@Body() data : UsersDto){
    return this.users.login(data);
  }


  //getMe
  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@Req() req: Request){

    return this.users.find(req.user['email']);
    
  }




}