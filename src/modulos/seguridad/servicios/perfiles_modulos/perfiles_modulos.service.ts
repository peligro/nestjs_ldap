import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Modulos } from 'src/modulos/db_type_orm/modelos/modulos.entity';
import { Perfiles } from 'src/modulos/db_type_orm/modelos/perfiles.entity';
import { PerfilesModulos } from 'src/modulos/db_type_orm/modelos/perfiles_modulos.entity';
import { Repository } from 'typeorm';
import { PerfilesModulosDto } from '../../dto/perfiles_modulos.dto';

@Injectable()
export class PerfilesModulosService {

    constructor(
        @InjectRepository(Modulos)
        private repositorioModulos: Repository<Modulos>,
        @InjectRepository(Perfiles)
        private repositorioPerfiles: Repository<Perfiles>,
        @InjectRepository(PerfilesModulos)
        private repositorioPerfilesModulos: Repository<PerfilesModulos>
    ) { }

    async getDatosPorPerfil(perfiles_id: number) {
        let perfil = await this.repositorioPerfiles.findOne(
            {

                where:
                {
                    id: perfiles_id
                }
            });

        if (!perfil) {
            throw new HttpException(
                {
                    estado: HttpStatus.NOT_FOUND,
                    mensaje: 'Recurso no disponible'
                }, HttpStatus.BAD_REQUEST, {
                cause: { name: "", message: "" }
            });
        }
        const datos = await this.repositorioPerfilesModulos
            .createQueryBuilder('perfiles_modulos')
            .innerJoinAndSelect('perfiles_modulos.modulos_id', 'modulo')
            .where('perfiles_modulos.perfiles_id = :perfiles_id', { perfiles_id })
            .orderBy('perfiles_modulos.id', 'DESC')
            .select([
                'perfiles_modulos.id AS id',
                'perfiles_modulos.perfiles_id AS perfiles_id',
                'perfiles_modulos.modulos_id AS modulos_id',
                //'modulo.nombre AS modulo_nombre',
            ])
            .getRawMany(); // Retorna los datos en formato plano

        return datos.map(item => ({
            id: item.id,
            perfiles_id: item.perfiles_id,
            modulos_id: item.modulos_id,
            //modulo_nombre: item.modulo_nombre
        }));
    }
    async addDatos(dto: PerfilesModulosDto) {
        let validaciones = await this.validacionesPerfilesModulos(dto);
        let existe = await this.repositorioPerfilesModulos.findOne(
            {
                where:
                {
                    perfiles_id: validaciones.perfil,
                    modulos_id: validaciones.modulo
                }
            });
        if (existe) {
            throw new HttpException(
                {
                    estado: HttpStatus.BAD_REQUEST,
                    mensaje: 'Ya está registrada esta relación'
                }, HttpStatus.BAD_REQUEST, {
                cause: { name: "", message: "" }
            });
        }
        try {
            let save = this.repositorioPerfilesModulos.create({ modulos_id: validaciones.modulo, perfiles_id: validaciones.perfil });
            this.repositorioPerfilesModulos.save(save);
            return { estado: 'ok', mensaje: 'Se crea el registro exitosamente' }
        } catch (error) {
            throw new HttpException(`Ocurrió un error inesperado`, HttpStatus.BAD_REQUEST);
        }
    }
    async deleteDato(id: number) {
        let datos = await this.repositorioPerfilesModulos.findOne(
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
        }
        this.repositorioPerfilesModulos.delete(id);
        return { estado: 'ok', mensaje: 'Se eliminó el registro exitosamente' }
    }
    //*******Validaciones */
    async validacionesPerfilesModulos(dto: PerfilesModulosDto) {
        let perfil = await this.repositorioPerfiles.findOne(
            {
                where:
                {
                    id: dto.perfil_id
                }
            });
        let modulo = await this.repositorioModulos.findOne(
            {
                where:
                {
                    id: dto.modulos_id
                }
            });
        if (!perfil || !modulo) {
            throw new HttpException(
                {
                    estado: HttpStatus.NOT_FOUND,
                    mensaje: 'Recurso no disponible'
                }, HttpStatus.BAD_REQUEST, {
                cause: { name: "", message: "" }
            });
        }
        return { perfil: perfil, modulo: modulo }
    }
}
