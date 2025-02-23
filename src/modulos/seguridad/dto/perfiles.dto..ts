import {  IsNotEmpty } from "class-validator"

export class PerfilesDto
{
    @IsNotEmpty({message:"El campo nombre es requerido"})
    nombre: string;

    @IsNotEmpty({message:"El campo descripcion es requerido"})
    descripcion: string;
}