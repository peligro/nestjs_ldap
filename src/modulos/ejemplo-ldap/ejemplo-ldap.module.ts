import { Module } from '@nestjs/common';
import { ConexionLdapService } from './servicios/conexion-ldap/conexion-ldap.service';
import { LdapController } from './controller/ldap/ldap.controller';

@Module({
  providers: [ConexionLdapService],
  controllers: [LdapController]
})
export class EjemploLdapModule {}
