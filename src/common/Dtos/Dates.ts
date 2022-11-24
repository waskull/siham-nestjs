import { IsDateString } from "class-validator";


export class Dates{
    @IsDateString()
    end: Date;
    @IsDateString()
    start: Date;
}