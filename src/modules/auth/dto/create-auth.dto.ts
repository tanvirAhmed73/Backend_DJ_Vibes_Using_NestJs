import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { Match } from 'src/common/decorators/match.decorator';

export class CreateAuthDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: 'John Doe', description: 'Name of the user'})
    name : string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({example:'john@gmail.com', description: 'Email of the user'})
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example:'password', description: 'Password of the user'})
    password:string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example:'confirmPassword', description: 'Confirm Password of the user'})
    @Match('password', {message: 'Password And Confirm Password Do Not Match'})
    confirmPassword:string;
}
