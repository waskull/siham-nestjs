import { Type } from "class-transformer";
import { IsNumber, Min, IsNotEmpty, IsArray, ValidateNested, ArrayMinSize } from "class-validator";
import { CreateInventoryDto } from "src/inventory/dtos";

export class item{
    @IsNumber()
    @Min(0,{message:"La cantidad debe de ser al menos 1"})
    quantity!: number;
    
    @IsNumber()
    @Min(0,{message:"La cantidad debe de ser al menos 1"})
    id!: number;
}

export class createOrderDto{
    @IsArray()
    @ArrayMinSize(1, {"message":"Debes enviar al menos un articulo e indicar su cantidad"})
    @ValidateNested({each:true, message:"Articulo invalido"})
    @Type(() => item)
    items: item[];
    
    @IsNumber()
    @Min(0,{message:"El precio no puede ser inferior a 0"})
    @IsNotEmpty({message:"Debes enviar el precio total de la compra"})
    price: number;
}