import { IsArray, IsEmail, IsEnum, IsNumber, IsOptional, IsString, Min, MinLength } from "class-validator";
import { AppRoles } from "src/app.roles";
import { EnumToString } from "src/common/utils/enumToString";
import { Rol } from "../enum";
export class CreateUserDto{
    @IsEmail({message:'El correo debe de ser una cadena de caracteres'})
    email: string;

    @IsString({message:'La contraseña debe de ser una cadena de caracteres'})
    password: string;

    @IsString({message:'El nombre debe de ser una cadena de caracteres'})
    @MinLength(3, {message:'El nombre debe de tener minimo 2 caracteres'})
    firstname: string;

    @IsString({message:'El apellido debe de ser una cadena de caracteres'})
    @MinLength(3, {message:'El apellido debe de tener minimo 2 caracteres'})
    lastname: string;

    @IsArray()
    @IsEnum(AppRoles, {each: true, message: `Debes de escoger un rol valido entre: ${EnumToString(AppRoles)}`})
    roles: string[];

    @IsNumber()
    @Min(1, {message:'La edad debe de ser mayor de 0'})
    age: number;

    @IsString({message:'La cedula debe de ser una cadena de caracteres'})
    @MinLength(3, {message:'La cedula debe de tener minimo 3 caracteres'})
    cedula: string;

    @IsOptional()
    @MinLength(5, {message:'El telefono debe de tener minimo 5 caracteres'})
    @IsString({message:'El telefono debe de ser una cadena de caracteres'})
    phone?: string;
}