import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { PerfilesService } from '../../servicios/perfiles/perfiles.service';
import { PerfilesDto } from '../../dto/perfiles.dto.';

@Controller('perfiles')
export class PerfilesController {
    constructor(private perfilesService: PerfilesService) { }
    
        @Get()
        @HttpCode(HttpStatus.OK)
        index() {
            return this.perfilesService.getDatos();
        }
    
        @Get(':id')
        @HttpCode(HttpStatus.OK)
        show(@Param() params): {} {
            return this.perfilesService.getDato(params.id);
        }
    
        @Post()
        @HttpCode(HttpStatus.CREATED)
        create(@Body() dto: PerfilesDto) {
            return this.perfilesService.addDatos(dto);
        }
    
        @Put(':id')
        update(@Param() params, @Body() dto: PerfilesDto) {
            this.perfilesService.updateDatos(params.id, { nombre: dto.nombre, descripcion: dto.descripcion });
            return { estado: "ok", mensaje: "Se modificó el registro exitosamente" }
        }
        @Delete(':id')
        destroy(@Param() params) {
            return this.perfilesService.deleteDato(params.id);
        }
}
