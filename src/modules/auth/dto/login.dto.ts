import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto{
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ example: 'tanvir.073.ahmed@gmail.com', description: 'Email of the user'})
    email: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'password123', description: 'Password of the user'})
    password: string;
}