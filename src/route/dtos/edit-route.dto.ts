import { IsNotEmpty, IsEnum } from "class-validator";
import { statusEnum } from "../enum/status.enum";

import { PartialType, OmitType } from "@nestjs/mapped-types";
import { createRouteDto } from "./create-route.dto";

export class EditRouteSalesmanDto{
    @IsEnum(statusEnum)
    @IsNotEmpty()
    status!: string;
}
export class EditItemDto extends createRouteDto {
    @IsEnum(statusEnum)
    @IsNotEmpty()
    status!: string;
}