import { Module } from '@nestjs/common';
import { AppController } from './app.controller'; 
//npm i --save @nestjs/config
import { ConfigModule } from '@nestjs/config';
import { EjemploLdapModule } from './modulos/ejemplo-ldap/ejemplo-ldap.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    EjemploLdapModule,
  ],
  controllers: [AppController],
  providers: [ ],
})
export class AppModule {}
