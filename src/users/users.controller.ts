import { Body, Controller, Get, HttpCode, HttpStatus, Param , Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersDto } from './dto';
import { Request } from 'express';
import { usersService } from './users.service';
import { JwtGuard } from './guard';
import { LoggingInterceptor } from './interceptor/logging.interceptor';

@Controller('users')

export class usersController {
  constructor(private users: usersService) {}

  //signup
  @Post('signup')
  signup(@Body() data : UsersDto){
    return this.users.register(data);
  }

  //signin
  @HttpCode(HttpStatus.OK)
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

  @Get('test')
  @UseInterceptors(LoggingInterceptor)
  test(){
    return "hi from test"
  }




}

function UseInterceptor() {
  throw new Error('Function not implemented.');
}
