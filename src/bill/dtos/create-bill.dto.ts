import { IsNumber, Min, IsOptional, IsString, MinLength, IsPositive, IsNotEmpty, IsEnum, IsArray, ArrayNotEmpty } from "class-validator";


export class createBill{
    @IsNumber()
    @Min(0, {message:"Debes de enviar un valor positivos o 0"})
    total_paid: number;

    @IsNumber()
    @IsPositive({message:"Codigo de Venta invalido"})
    sale_id: number;

    @IsArray()
    @ArrayNotEmpty({message:"Debes de enviar al menos un codigo de referencia"})
    pay_code: string[];

}