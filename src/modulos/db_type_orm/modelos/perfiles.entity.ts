import {Entity, Column, PrimaryGeneratedColumn, Index} from 'typeorm';
@Entity()
export class Perfiles{

    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({name: 'nombre', type: "varchar", length: 100})
    nombre: string;

    @Index()
    @Column({ type: 'text', nullable: true })
    descripcion: string; 
 

  
}