import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class loginKey {
  @PrimaryColumn()
  _id: number;

  @Column()
  key: string;
}
