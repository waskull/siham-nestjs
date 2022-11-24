import { IsNumber, IsString, MinLength, Min } from "class-validator";

export class CreateItemDto{

    @IsString({message:'Debe de ser una cadena de caracteres'})
    @MinLength(3, {message:'Nombre debe de tener mas de 2 caracteres'})
    name: string;

    @IsNumber()
    @Min(0, {message:'Precio debe de ser mayor a 2'})
    price: number;
}