import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ type: 'varchar', length: 50 })
  firstName: string;
  @Column({ type: 'varchar', length: 50 })
  lastName: string;
  @Column({ type: 'date', nullable: true })
  birthDate: Date;
  @Column({ unique: true })
  email: string;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  constructor(
    firstName: string,
    lastName: string,
    birthDate: Date,
    email: string,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
    this.email = email;
  }

  get age(): number {
    if (!this.birthDate) return 0;
    const today = new Date();
    let age = today.getFullYear() - this.birthDate.getFullYear();
    const m = today.getMonth() - this.birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < this.birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
