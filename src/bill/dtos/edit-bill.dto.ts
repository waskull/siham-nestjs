import { ArrayMinSize, IsArray, IsNumber, IsPositive } from "class-validator";

export class EditBillDto{
    @IsArray()
    @ArrayMinSize(1, {message:"Debes de enviar al menos un codigo de referencia"})
    pay_code: string[];

    @IsNumber()
    @IsPositive({message:"Debes de enviar un valor positivo"})
    total_paid: number;
}