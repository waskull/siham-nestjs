import { CreateUserDto } from "./create-user.dto";
import { PartialType, OmitType } from "@nestjs/mapped-types";


export class EditUserDto extends PartialType(
    OmitType(CreateUserDto, ['email'] as const)
    ) {}

    export class EditMyUserDto extends PartialType(
        OmitType(CreateUserDto, ['email','roles'] as const)
        ) {}