import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  @Column({ nullable: true })
  tokenKey: string;

  @Column({ nullable: true })
  refreshtokenKey: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
