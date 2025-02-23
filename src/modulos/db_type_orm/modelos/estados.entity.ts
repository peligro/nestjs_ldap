import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class Estado {

    @PrimaryGeneratedColumn()
    id: number;

    @Index() // Agrega un índice a este campo
    @Column({ name: 'nombre', type: "varchar", length: 100 })
    nombre: string;
}
