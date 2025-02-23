import 'dotenv/config';
import { Estado } from 'src/modulos/db_type_orm/modelos/estados.entity';
import { Modulos } from 'src/modulos/db_type_orm/modelos/modulos.entity';
import { Perfiles } from 'src/modulos/db_type_orm/modelos/perfiles.entity';
import { Usuarios } from 'src/modulos/db_type_orm/modelos/usuarios.entity';
import { DataSource } from 'typeorm'; 

export const AppDataSource = new DataSource({
  type: 'postgres', // Cambia a tu DB: postgres, sqlite, etc.
  host: process.env.DATABASE_SERVER  ,
  port: Number(process.env.DATABASE_PORT) ,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  entities: [Estado, Modulos, Perfiles, Usuarios],
  synchronize: false,
  logging: true,
});
