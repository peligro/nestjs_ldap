import { Module } from '@nestjs/common';
//npm install --save @nestjs/typeorm typeorm pg
import {TypeOrmModule} from '@nestjs/typeorm';
import { Estado } from './modelos/estados.entity';
import { Modulos } from './modelos/modulos.entity';
import { Perfiles } from './modelos/perfiles.entity';
import { PerfilesModulos } from './modelos/perfiles_modulos.entity';
import { Usuarios } from './modelos/usuarios.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de configuración estén disponibles en toda la aplicación
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_SERVER'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_DATABASE'),
        entities: [Estado, Modulos, Perfiles, PerfilesModulos, Usuarios], // Agregar las entidades aquí
        autoLoadEntities: true,
        synchronize: true, // Cambiar a false en producción
      }),
    })
,
  ]
})
export class DbTypeOrmModule {
    
}
