import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class loginKey {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  key: string;
}
