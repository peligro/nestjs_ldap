import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { UsuariosService } from '../../servicios/usuarios/usuarios.service';
import { UsuariosDto } from '../../dto/usuarios.dto';

@Controller('usuarios')
export class UsuariosController {
    constructor(private usuariosService: UsuariosService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    index() {
        return this.usuariosService.getDatos();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    show(@Param() params): {} {
        return this.usuariosService.getDato(params.id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: UsuariosDto) {
        return this.usuariosService.addDatos(dto);
    }

    @Put(':id')
    update(@Param() params, @Body() dto: UsuariosDto) {
        this.usuariosService.updateDatos(params.id, { correo: dto.correo, estado_id: dto.estado_id, perfil_id: dto.perfil_id });
        return { estado: "ok", mensaje: "Se modificó el registro exitosamente" }
    }
    @Delete(':id')
    destroy(@Param() params) {
        return this.usuariosService.deleteDato(params.id);
    }
}
