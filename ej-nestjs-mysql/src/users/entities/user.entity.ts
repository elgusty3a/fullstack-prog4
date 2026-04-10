import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50 })
  firstName: string;

  @Column({ type: 'varchar', length: 50 })
  lastName: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  email: string;

  constructor(firstName: string, lastName: string, age: number, email: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.email = email;
  }
}
