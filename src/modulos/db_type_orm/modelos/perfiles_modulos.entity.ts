import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, Index} from 'typeorm';
import { Perfiles } from './perfiles.entity';
import { Modulos } from './modulos.entity';
@Entity()
export class PerfilesModulos{

    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @ManyToOne((type)=>Perfiles, perfiles =>perfiles.id, {cascade: true, eager: true, nullable: false})
    @JoinColumn({name: 'perfiles_id'})
    perfiles_id: Perfiles

    @Index()
    @ManyToOne((type)=>Modulos, modulos =>modulos.id, {cascade: true, eager: true, nullable: false})
    @JoinColumn({name: 'modulos_id'})
    modulos_id: Modulos
 

  
}