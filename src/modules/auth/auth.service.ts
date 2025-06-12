import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserRepository } from 'src/common/repository/user/user.repository';

@Injectable()
export class AuthService {
  async register(user_data:CreateAuthDto) {
    try {
      const {name, email, password} = user_data
      
      // check if user email exist or not
      const userEmailExist = await UserRepository.exist({
        field: 'email',
        value: email
      });

      if(userEmailExist){
        throw new HttpException('Email already exist', HttpStatus.CONFLICT)
      }

      // create user
      const user = await UserRepository.createUser(user_data)
      if(!user){
        throw new HttpException('User not created', HttpStatus.INTERNAL_SERVER_ERROR)
      }
      return {
        statusCode: 201,
        message: 'User created successfully'
      };
    } catch (error) {
      
    }
  }


}
