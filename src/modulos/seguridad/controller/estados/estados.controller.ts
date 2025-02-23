import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { EstadoDto } from '../../dto/estado.dto';
import { EstadosService } from '../../servicios/estados/estados.service';
import { EstadosInterface } from 'src/interfaces/estados.interface';

@Controller('estados')
export class EstadosController {

    constructor(private estadosService: EstadosService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    async index():Promise<EstadosInterface[]> {
        let datos=await this.estadosService.getDatos();
        return datos.map(item => ({
            id: item.id,
            nombre: item.nombre
          }));
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async show(@Param() params):Promise<EstadosInterface>   {
        let datos = await this.estadosService.getDato(params.id);
        return {id:datos.id, nombre: datos.nombre}
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: EstadoDto) {
        return this.estadosService.addDatos(dto);
    }

    @Put(':id')
    update(@Param() params, @Body() dto: EstadoDto) {
        this.estadosService.updateDatos(params.id, { nombre: dto.nombre });
        return { estado: "ok", mensaje: "Se modificó el registro exitosamente" }
    }
    @Delete(':id')
    destroy(@Param() params) {
        return this.estadosService.deleteDato(params.id);
    }
}
