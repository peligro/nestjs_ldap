import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { PerfilesModulosService } from '../../servicios/perfiles_modulos/perfiles_modulos.service';
import { PerfilesModulosDto } from '../../dto/perfiles_modulos.dto';

@Controller('perfiles-modulos')
export class PerfilesModulosController {
    constructor(private perfilesModulosService: PerfilesModulosService) { }


    @Get(':id')
    @HttpCode(HttpStatus.OK)
    datos_por_perfil(@Param() params): {} {
        return this.perfilesModulosService.getDatosPorPerfil(params.id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: PerfilesModulosDto) {
        return this.perfilesModulosService.addDatos(dto);
    }

    @Delete(':id')
    destroy(@Param() params) {
        return this.perfilesModulosService.deleteDato(params.id);
    }
}
