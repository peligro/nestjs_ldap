import { Estado } from 'src/modulos/db_type_orm/modelos/estados.entity';
import { Modulos } from 'src/modulos/db_type_orm/modelos/modulos.entity';
import { Perfiles } from 'src/modulos/db_type_orm/modelos/perfiles.entity';
import { Usuarios } from 'src/modulos/db_type_orm/modelos/usuarios.entity';
import { Repository } from 'typeorm';

export class GeneralSeeder {
    constructor(
        private readonly repositorioEstado: Repository<Estado>,
        private readonly repositorioModulo: Repository<Modulos>,
        private readonly repositorioPerfiles: Repository<Perfiles>,
        private readonly repositorioUsuario: Repository<Usuarios>
    ) { }

    async run() {
        //estados
        const estados = [
            {
                id: 1,
                nombre: 'Activo',
            },
            {
                id: 2,
                nombre: 'No activo'
            },
        ];

        for (const estado of estados) {
            await this.repositorioEstado.save(estado);
        }
        //módulos
        const modulos = [
            {
                id: 1,
                nombre: 'Módulos',
            },
            {
                id: 2,
                nombre: 'Perfiles'
            },
            {
                id: 3,
                nombre: 'Usuarios'
            }
        ];

        for (const modulo of modulos) {
            await this.repositorioModulo.save(modulo);
        }
        //perfiles
        const perfiles = [
            {
                id: 1,
                nombre: 'Administrador',
                descripcion: 'Tiene acceso a toda la aplicación'
            },
            {
                id: 2,
                nombre: 'Sin acceso',
                descripcion: 'No tiene permiso a nada pero puede entrar a la aplicación'
            }
        ];

        for (const perfile of perfiles) {
            await this.repositorioPerfiles.save(perfile);
        }

        //usuarios
        let estadoRegistro = await this.repositorioEstado.findOne(
            {
                where:
                {
                    id:1
                }
            });
        let perfilRegistro = await this.repositorioPerfiles.findOne(
            {
                where:
                {
                    id: 1
                }
            });
            
        const usuarios = [
            { 
                id:1,
                correo: "cesar.cancino@cencosud.cl", 
                estado_id: estadoRegistro, 
                perfiles_id: perfilRegistro,
            },
            {
                id: 2,
                correo: "jonathan.moralessalazar@externos-cl.cencosud.com",
                estado_id: estadoRegistro, 
                perfiles_id: perfilRegistro,
            },
            {
                id: 3,
                correo: "ruben.gonzalezgonzalez@externos-cl.cencosud.com",
                estado_id: estadoRegistro, 
                perfiles_id: perfilRegistro,
            }
        ];
        
        


        console.log('Se sembraron los datos exitosamente');
    }
}
