import { Module } from '@nestjs/common'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneralSeeder } from '../seeds/general.seed';
import { Estado } from 'src/modulos/db_type_orm/modelos/estados.entity';
@Module({
    imports: [TypeOrmModule.forFeature([Estado])],
    providers: [GeneralSeeder],
    exports: [GeneralSeeder],
  })
export class DatabaseModule {}
