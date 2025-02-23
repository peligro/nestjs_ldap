import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstadosInterface } from 'src/interfaces/estados.interface';
import { Estado } from 'src/modulos/db_type_orm/modelos/estados.entity';
import { EstadoDto } from 'src/modulos/seguridad/dto/estado.dto';
import { Repository } from 'typeorm';

@Injectable()
export class EstadosService {

    constructor(
        @InjectRepository(Estado)
        private repositorio: Repository<Estado>
    ) { }

    async getDatos(): Promise<Estado[]> {
        return await this.repositorio.find({
            order: {
                id: "desc"
            }
        });
    }

    async getDato(id: number): Promise<Estado> {
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

    async addDatos(dto: EstadoDto) {
        let existe = await this.repositorio.findOne(
            {
                where:
                {
                    nombre: dto.nombre
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
    async updateDatos(id: number, dto: EstadoDto) {
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
        /*let existe = await this.repositorio_producto.find(
            {
                where:
                {
                    categoria_id: {id:id}
                }
            });
        if(existe.length>=1)
        {
            throw new HttpException("No es posible eliminar el registro en este momento", HttpStatus.BAD_REQUEST);
        }else
        {
            this.repositorio.delete(id);
            return {estado: 'ok', mensaje: 'Se eliminó el registro exitosamente'}
        }*/
    }
}
