// npm i --save class-validator class-transformer
import {  IsNotEmpty } from "class-validator"

export class EstadoDto
{
    @IsNotEmpty({message:"El campo nombre es requerido"})
    nombre: string;
}