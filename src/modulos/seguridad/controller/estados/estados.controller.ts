import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { EstadoDto } from '../../dto/estado.dto'; 
import { EstadosService } from '../../servicios/estados/estados.service';

@Controller('estados')
export class EstadosController {

    constructor(private estadosService: EstadosService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    index()
    {
        return this.estadosService.getDatos();
    }   

    @Get(':id') 
    @HttpCode(HttpStatus.OK)
    show(@Param() params): {} { 
    return this.estadosService.getDato(params.id);
    }
    
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: EstadoDto)
    {
        return this.estadosService.addDatos(dto);
    }

    @Put(':id')
    update(@Param() params, @Body() dto: EstadoDto)
    {
        this.estadosService.updateDatos(params.id, {nombre: dto.nombre});
        return {estado: "ok", mensaje: "Se modificó el registro exitosamente"}
    }
    @Delete(':id')
    destroy(@Param() params)
    {
        return this.estadosService.deleteDato(params.id);
    }
}
