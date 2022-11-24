import { IsEmail, IsString } from "class-validator";

export class LoginDto{
    @IsEmail({message:'El correo debe de ser una cadena de caracteres'})
    email: string;
    @IsString({message:'La contraseña debe de ser una cadena de caracteres'})
    password: string;
}