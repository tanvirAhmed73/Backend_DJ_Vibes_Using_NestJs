import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user'})
  async register(@Body() userdata: CreateAuthDto) {
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

  @Post('login')
  @ApiOperation({ summary: 'Login a user'})
  @UseGuards()
  async login(@Body() loginData: LoginDto){
    try{
      // check if user email exist or not
       
    }catch(error){
      return {
        statusCode: 400,
        message: error.message
      }
    }
  }
}
