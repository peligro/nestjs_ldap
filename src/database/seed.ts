import { config } from 'dotenv'; 
import { GeneralSeeder } from './seeds/general.seed';
import { AppDataSource } from './data-source';

config(); // Cargar variables de entorno si es necesario

async function runSeeders() {
  console.log('Inicializando conexión a base de datos...');
  await AppDataSource.initialize();

  console.log('Ejecutando Seeders...');
  const generalSeeder = new GeneralSeeder(
    AppDataSource.getRepository('Estado'),
    AppDataSource.getRepository('Modulos'),
    AppDataSource.getRepository('Perfiles'),
    AppDataSource.getRepository('Usuarios')
);
  await generalSeeder.run();

  console.log('Seeding ejecutado exitosamente.');
  await AppDataSource.destroy();
}

runSeeders().catch((err) => {
  console.error('Ocurrió un error:', err);
});
//npx ts-node -r tsconfig-paths/register src/database/seed.ts