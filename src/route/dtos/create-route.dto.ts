import { IsNumber, Min, IsOptional, IsString, MinLength, IsPositive, IsNotEmpty, IsArray, ArrayNotEmpty } from "class-validator";
import { Company } from "src/company/entities";

export class createRouteDto{

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty({message:"El ID del vendedor es requerido"})
    @IsNumber()
    @IsPositive({message:"El id del vendedor debe de ser valido"})
    salesman!: number;

    @IsArray()
    @ArrayNotEmpty({message:"Debes de enviar el ID de al menos una compañia"})
    companies!: number[];
}