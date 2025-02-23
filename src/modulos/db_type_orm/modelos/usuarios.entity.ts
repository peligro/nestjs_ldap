import {Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, Index, Column} from 'typeorm';
import { Perfiles } from './perfiles.entity';
import { Estado } from './estados.entity';
@Entity()
export class Usuarios{

    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ name: 'correo', type: "varchar", length: 100 })
    correo: string;

    @Index()
    @ManyToOne((type)=>Estado, estado =>estado.id, {cascade: true, eager: true, nullable: false})
    @JoinColumn({name: 'estado_id'})
    estado_id: Estado
     
    @Index()
    @ManyToOne((type)=>Perfiles, perfiles =>perfiles.id, {cascade: true, eager: true, nullable: false})
    @JoinColumn({name: 'perfiles_id'})
    perfiles_id: Perfiles
 
 

  
}