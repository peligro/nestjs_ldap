import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuarios } from 'src/modulos/db_type_orm/modelos/usuarios.entity';
import { Repository } from 'typeorm';
import { UsuariosDto } from '../../dto/usuarios.dto';
import { Estado } from 'src/modulos/db_type_orm/modelos/estados.entity';
import { Perfiles } from 'src/modulos/db_type_orm/modelos/perfiles.entity';

@Injectable()
export class UsuariosService {

    constructor(
        @InjectRepository(Usuarios)
        private repositorio: Repository<Usuarios>,
        @InjectRepository(Estado)
        private repositorioEstado: Repository<Estado>,
        @InjectRepository(Perfiles)
        private repositorioPerfiles: Repository<Perfiles>
    ) { }

    async getDatos(): Promise<Usuarios[]> {
        return await this.repositorio.find(
            {
                order:
                {
                    id: "desc"
                }
            });
    }
    async getDato(id: number): Promise<Usuarios> {
        let datos = await this.repositorio.findOne(
            {
                where:
                {
                    id: id
                }
            });
        if (!datos) {
            throw new HttpException(
                {
                    estado: HttpStatus.BAD_REQUEST,
                    mensaje: 'El registro no existe en el sistema'
                }, HttpStatus.BAD_REQUEST, {
                cause: { name: "", message: "" }
            });
        } else {
            return datos;
        }
    }

    async addDatos(dto: UsuariosDto) {
        let validaciones= await this.validacionesUsuario(dto);
        try {
            let save = this.repositorio.create({ correo: dto.correo, estado_id: validaciones.estado, perfiles_id: validaciones.perfil });
            this.repositorio.save(save);
            return { estado: 'ok', mensaje: 'Se crea el registro exitosamente' }
        } catch (error) {
            throw new HttpException(`Ocurrió un error inesperado`, HttpStatus.BAD_REQUEST);
        }
    }
    async updateDatos(id: number, dto: UsuariosDto) {
        let validaciones= await this.validacionesUsuario(dto);
        let datos = await this.repositorio.findOne(
            {
                where:
                {
                    id: id
                }
            });
        if (!datos) {
            throw new HttpException(
                {
                    estado: HttpStatus.BAD_REQUEST,
                    mensaje: 'El registro no existe en el sistema'
                }, HttpStatus.BAD_REQUEST, {
                cause: { name: "", message: "" }
            });
        } else {
            await this.repositorio.update({ id }, { correo: dto.correo, estado_id: validaciones.estado, perfiles_id: validaciones.perfil });
        }

    }
    async deleteDato(id: number) {

    }
    //*************VALIDACIONES */

    async validacionesUsuario(dto: UsuariosDto)
    {
        let estado = await this.repositorioEstado.findOne(
            {
                where:
                {
                    id: dto.estado_id
                }
            });
        let perfil = await this.repositorioPerfiles.findOne(
            {
                where:
                {
                    id: dto.perfil_id
                }
            });

        if (!estado || !perfil) {
            throw new HttpException(
                {
                    estado: HttpStatus.BAD_REQUEST,
                    mensaje: 'Ocurrió un error inesperado'
                }, HttpStatus.BAD_REQUEST, {
                cause: { name: "", message: "" }
            });
        }
        let correo = await this.repositorio.findOne(
            {
                where:
                {
                    correo: dto.correo
                }
            });
        if (correo) {
            throw new HttpException(
                {
                    estado: HttpStatus.BAD_REQUEST,
                    mensaje: 'El correo ya está registrado'
                }, HttpStatus.BAD_REQUEST, {
                cause: { name: "", message: "" }
            });
        }
        return {estado: estado, perfil: perfil}
    }
}
