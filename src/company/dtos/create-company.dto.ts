import { IsNumber, Min, IsOptional, IsString, MinLength, IsPositive, IsNotEmpty } from "class-validator";

export class createCompanyDto{
    @IsString({message:'El nombre debe de ser una cadena de caracteres'})
    @MinLength(3, {message:'El nombre de la compañia debe de tener minimo 2 caracteres'})
    name: string;

    @MinLength(5, {message:'El telefono debe de tener minimo 5 caracteres'})
    @IsString({message:'El telefono debe de ser una cadena de caracteres'})
    phone: string;

    @IsOptional()
    @MinLength(5, {message:'El telefono secundario debe de tener minimo 5 caracteres'})
    @IsString({message:'El telefono debe de ser una cadena de caracteres'})
    phone2?: string;

    @MinLength(5, {message:'La dirección debe de tener minimo 5 caracteres'})
    @IsString({message:'La dirección debe de ser una cadena de caracteres'})
    address: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive({message:"El id del cliente debe de ser valido"})
    client_id: number;
}