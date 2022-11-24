import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class CreateClientDto{
    @IsOptional()
    @IsEmail({message:'El correo debe de ser una cadena de caracteres'})
    email?: string;

    @IsString({message:'El nombre debe de ser una cadena de caracteres'})
    @MinLength(3, {message:'El nombre debe de tener minimo 2 caracteres'})
    firstname: string;

    @IsString({message:'El apellido debe de ser una cadena de caracteres'})
    @MinLength(3, {message:'El apellido debe de tener minimo 2 caracteres'})
    lastname: string;

    @IsString({message:'La cedula debe de ser una cadena de caracteres'})
    @MinLength(3, {message:'La cedula debe de tener minimo 3 caracteres'})
    cedula: string;

    @IsOptional()
    @MinLength(5, {message:'El telefono debe de tener minimo 5 caracteres'})
    @IsString({message:'El telefono debe de ser una cadena de caracteres'})
    phone?: string;
}