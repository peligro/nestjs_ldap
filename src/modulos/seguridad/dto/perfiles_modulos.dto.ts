import { IsNumber } from "class-validator"

export class PerfilesModulosDto
{
    @IsNumber({}, {message:"El campo modulos_id es requerido"})
    modulos_id:number;

    @IsNumber({}, {message:"El campo perfil_id es requerido"})
    perfil_id:number;
}