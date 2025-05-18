import { HttpException, HttpStatus } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import appConfig from "src/config/app.config";
import { CreateAuthDto } from "src/modules/auth/dto/create-auth.dto";
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export class UserRepository{
   /*  
    * Get user by email
    * @params email
    * @return 
    */
   static async exist({field,value}){
    const user = await prisma.user.findFirst({
        where:{
            [field]: value
        }
    })
    return user;
   }

   

   /* 
    * create user
    * @params user_data
    * @return user 
   */
  static async createUser(user_data:CreateAuthDto){
    try {
        const {name, email, password, type} = user_data
        const data = {}

        if(name){
            data['name'] = name
        }
        if(email){
            const userExist = await this.exist({field:"email", value:email});

            if(userExist){
                throw new HttpException('Email already exist', HttpStatus.CONFLICT)
            }

            data["email"] = email
        }
        if(password){
            data['password'] = await bcrypt.hash(password, appConfig().security.salt)
        }

        if(type){
            data['type'] = type
        }
        
        const userCreate = await prisma.user.create({
            data:data as Prisma.UserCreateInput
        })

        return userCreate


    } catch (error) {
        
    }
}

}