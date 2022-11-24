import { IsNumber, Min,ArrayMinSize, ValidateNested, IsPositive, IsNotEmpty, IsArray, ArrayNotEmpty } from "class-validator";
import { CreateInventoryDto } from "src/inventory/dtos";
import { Type } from "class-transformer";

export class item{
    @IsNumber()
    @Min(0,{message:"La cantidad debe de ser al menos 1"})
    quantity!: number;
    
    @IsNumber()
    @Min(0,{message:"La cantidad debe de ser al menos 1"})
    id!: number;
}

export class CreateSaleDto{
    
    @IsArray()
    @ArrayMinSize(1, {"message":"Debes enviar al menos un articulo e indicar su cantidad"})
    @ValidateNested({each:true, message:"Articulo invalido"})
    @Type(() => item)
    items!: item[];
    
    @IsNotEmpty({message:"El ID del vendedor es requerido"})
    @IsNumber()
    @IsPositive({message:"El ID del vendedor debe de ser valido"})
    client!: number;
}

