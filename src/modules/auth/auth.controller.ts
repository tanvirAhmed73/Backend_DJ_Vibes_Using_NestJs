import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() userdata: CreateAuthDto) {
    try {
      // check if user name exist or not
      if(!userdata.name){
        throw new HttpException('Name is required', HttpStatus.UNAUTHORIZED)
      }
      // check if user email exist or not
      if(!userdata.email){
        throw new HttpException('Email is required', HttpStatus.UNAUTHORIZED)
      }
      // check if user password exist or not
      if(!userdata.password){
        throw new HttpException('Password is required', HttpStatus.UNAUTHORIZED)
      }

      return this.authService.register(userdata);
    } catch (error) {
      return {
        statusCode: 400,
        message: error.message
      }
    }
  }
}
