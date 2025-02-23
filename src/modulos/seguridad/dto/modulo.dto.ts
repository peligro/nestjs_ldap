import {  IsNotEmpty } from "class-validator"

export class ModuloDto
{
    @IsNotEmpty({message:"El campo nombre es requerido"})
    nombre: string;
}