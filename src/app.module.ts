import { Module } from '@nestjs/common';
import { AppController } from './app.controller'; 
//npm i --save @nestjs/config
import { ConfigModule } from '@nestjs/config';
import { EjemploLdapModule } from './modulos/ejemplo-ldap/ejemplo-ldap.module';
import { DbTypeOrmModule } from './modulos/db_type_orm/db_type_orm.module';
import { SeguridadModule } from './modulos/seguridad/seguridad.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    EjemploLdapModule, DbTypeOrmModule, SeguridadModule
  ],
  controllers: [AppController],
  providers: [ ],
})
export class AppModule {}
