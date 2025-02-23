import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ModulosService } from '../../servicios/modulos/modulos.service';
import { ModuloDto } from '../../dto/modulo.dto';

@Controller('modulos')
export class ModulosController {
    constructor(private modulosService: ModulosService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    index() {
        return this.modulosService.getDatos();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    show(@Param() params): {} {
        return this.modulosService.getDato(params.id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: ModuloDto) {
        return this.modulosService.addDatos(dto);
    }

    @Put(':id')
    update(@Param() params, @Body() dto: ModuloDto) {
        this.modulosService.updateDatos(params.id, { nombre: dto.nombre });
        return { estado: "ok", mensaje: "Se modificó el registro exitosamente" }
    }
    @Delete(':id')
    destroy(@Param() params) {
        return this.modulosService.deleteDato(params.id);
    }
}
