import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    fullNmae: string;

    @IsNumber()
    @IsNotEmpty()
    pin: number;

    @IsNumber()
    @IsNotEmpty()
    account: number;
}