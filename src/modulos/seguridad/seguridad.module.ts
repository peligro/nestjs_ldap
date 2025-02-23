import { Module } from '@nestjs/common';  
import { EstadosController } from './controller/estados/estados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estado } from '../db_type_orm/modelos/estados.entity';
import { EstadosService } from './servicios/estados/estados.service';
import { ModulosService } from './servicios/modulos/modulos.service';
import { ModulosController } from './controller/modulos/modulos.controller';
import { Modulos } from '../db_type_orm/modelos/modulos.entity';
import { PerfilesService } from './servicios/perfiles/perfiles.service';
import { PerfilesController } from './controller/perfiles/perfiles.controller';
import { Perfiles } from '../db_type_orm/modelos/perfiles.entity';
import { Usuarios } from '../db_type_orm/modelos/usuarios.entity';
import { PerfilesModulos } from '../db_type_orm/modelos/perfiles_modulos.entity';
import { UsuariosService } from './servicios/usuarios/usuarios.service';
import { UsuariosController } from './controller/usuarios/usuarios.controller';
import { PerfilesModulosController } from './controller/perfiles_modulos/perfiles_modulos.controller';
import { PerfilesModulosService } from './servicios/perfiles_modulos/perfiles_modulos.service';

@Module({
    imports: [TypeOrmModule.forFeature([Estado, Modulos, Perfiles, Usuarios, PerfilesModulos])],
    controllers: [EstadosController, ModulosController, PerfilesController, UsuariosController, PerfilesModulosController],
    providers: [EstadosService, ModulosService, PerfilesService, UsuariosService, PerfilesModulosService],
    exports: [EstadosService], 
})
export class SeguridadModule {}
