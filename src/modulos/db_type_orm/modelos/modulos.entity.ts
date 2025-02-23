import {Entity, Column, PrimaryGeneratedColumn, BeforeInsert, Index} from 'typeorm';
@Entity()
export class Modulos{

    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({name: 'nombre', type: "varchar", length: 100})
    nombre: string;
 

  
}