import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Perfiles } from 'src/modulos/db_type_orm/modelos/perfiles.entity';
import { Repository } from 'typeorm';
import { PerfilesDto } from '../../dto/perfiles.dto.';

@Injectable()
export class PerfilesService {
    constructor(
        @InjectRepository(Perfiles)
        private repositorio: Repository<Perfiles>
    ) { }

    async getDatos(): Promise<Perfiles[]> {
        return await this.repositorio.find(
            {
                order:
                {
                    id: "desc"
                }
            });
    }
    async getDato(id: number): Promise<Perfiles> {
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

    async addDatos(dto: PerfilesDto) {
        let existe = await this.repositorio.findOne(
            {
                where:
                {
                    nombre: dto.nombre,
                    descripcion: dto.descripcion
                }
            });
        if (existe) {
            throw new HttpException(`El registro ${dto.nombre} ya existe en el sistema`, HttpStatus.BAD_REQUEST);

        } else {
            try {
                let save = this.repositorio.create(dto);
                this.repositorio.save(save);
                return { estado: 'ok', mensaje: 'Se crea el registro exitosamente' }
            } catch (error) {
                throw new HttpException(`Ocurrió un error inesperado`, HttpStatus.BAD_REQUEST);
            }

        }
    }
    async updateDatos(id: number, dto: PerfilesDto) {
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
            await this.repositorio.update({ id }, dto);
        }

    }
    async deleteDato(id: number) {

    }
}
