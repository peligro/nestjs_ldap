import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Modulos } from 'src/modulos/db_type_orm/modelos/modulos.entity';
import { Repository } from 'typeorm';
import { ModuloDto } from '../../dto/modulo.dto';

@Injectable()
export class ModulosService {
     constructor(
            @InjectRepository(Modulos)
            private repositorio: Repository<Modulos>
        ){}
    
        async getDatos():Promise<Modulos[]>
        {
            return await this.repositorio.find(
                {
                    order:
                    {
                        id:"desc"
                    }
                });
        }
        async getDato(id: number): Promise<Modulos>
        {
            let datos = await this.repositorio.findOne(
                {
                    where:
                    {
                        id:id
                    }
                });
            if(!datos)
            {
                throw new HttpException(
                    {
                        estado: HttpStatus.BAD_REQUEST,
                        mensaje: 'El registro no existe en el sistema'
                    }, HttpStatus.BAD_REQUEST, {
                        cause: {name:"", message:""}
                    });
            }else
            {
                return datos;
            }
        }
    
        async addDatos(dto: ModuloDto)
        {
            let existe = await this.repositorio.findOne(
                {
                    where:
                    {
                        nombre: dto.nombre
                    }
                });
            if(existe)
            {
                throw new HttpException(`El registro ${dto.nombre} ya existe en el sistema`, HttpStatus.BAD_REQUEST);
                
            }else
            {
                try {
                    let save = this.repositorio.create(dto);
                    this.repositorio.save(save);
                    return {estado: 'ok', mensaje:'Se crea el registro exitosamente'}
                } catch (error) {
                    throw new HttpException(`Ocurrió un error inesperado`, HttpStatus.BAD_REQUEST);
                }
                
            }
        }
        async updateDatos(id:number, dto: ModuloDto)
        {
            let datos = await this.repositorio.findOne(
                {
                    where:
                    {
                        id:id
                    }
                });
            if(!datos)
            {
                throw new HttpException(
                    {
                        estado: HttpStatus.BAD_REQUEST,
                        mensaje: 'El registro no existe en el sistema'
                    }, HttpStatus.BAD_REQUEST, {
                        cause: {name:"", message:""}
                    });
            }else
            {
                await this.repositorio.update( {id}, dto);
            }
            
        }
        async deleteDato(id: number)
        {
             
        }
}
