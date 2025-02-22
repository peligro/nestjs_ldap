import { Injectable, Logger } from '@nestjs/common';
//npm install ldapts
import { Client } from 'ldapts';

@Injectable()
export class ConexionLdapService {
   
  private readonly server = process.env.LDAP_SERVER;
  private readonly domain = process.env.LDAP_DOMINIO;
  private readonly port = process.env.LDAP_PORT;
  private readonly dn = `dc=${process.env.LDAP_DN1}, dc=${process.env.LDAP_DN2}`;
  private readonly attrs = [
   
    'mail',
    'useraccountcontrol',
    'givenname',
    'sn',
    'cn',
    'department',
    'samaccountname' 
  ];

  private ldapClient: Client;

  constructor() {
    this.ldapClient = new Client({
      url: `ldap://${this.server}:${this.port}`,
    });
  }

  // Método para autenticar y retornar datos del usuario
  async authenticate(user: string, password: string): Promise<any> {
    const bindDN = user + this.domain;

    try {
      // Realizamos la autenticación (bind)
      await this.ldapClient.bind(bindDN, password);

      // Si la autenticación es exitosa, realizamos la búsqueda del usuario
      const filter = `sAMAccountName=${user}*`;
      const result = await this.ldapClient.search(this.dn, {
        filter,
        scope: 'sub',
        attributes: this.attrs,
      });

      // Verificamos si se encontraron entradas
      if (result.searchEntries.length > 0) {
        return result.searchEntries[0] ; // Retornamos el primer resultado encontrado
        //return result.searchEntries[0]['userAccountControl'];
      } else {
        throw new Error('Usuario no encontrado');
      }
    } catch (err) {
      throw new Error('Autenticación fallida: ' + err.message);
    }
  }

 
}
