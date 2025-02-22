import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ConexionLdapService } from '../../servicios/conexion-ldap/conexion-ldap.service';
@Controller('ldap')
export class LdapController {
    constructor(private readonly conexionLdapService: ConexionLdapService) {}

    @Post()
    async login(@Body() body: { username: string; password: string }) {
      const { username, password } = body;
      try {
        const result = await this.conexionLdapService.authenticate( username, password); 
        return { success: result };
      } catch (error) {
        return { success: false, message: error };
      }
    }
     
   
}
