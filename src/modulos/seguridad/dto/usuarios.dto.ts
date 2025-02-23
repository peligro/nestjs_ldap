import {  IsEmail, IsNotEmpty, IsNumber } from "class-validator"

export class UsuariosDto
{
    @IsNotEmpty({message:"El campo correo es requerido"})
    @IsEmail({}, {message:"El correo ingresado no es válido"})
    correo:string;
    
    @IsNumber({}, {message:"El campo estado_id es requerido"})
    estado_id:number;

    @IsNumber({}, {message:"El campo perfil_id es requerido"})
    perfil_id:number;
}