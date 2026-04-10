import { IsEmail, IsNumber, IsString, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;
  @IsString()
  lastname: string;
  @IsNumber()
  @Min(1)
  age: number;
  @IsEmail()
  email: string;

  constructor(firstName: string, lastname: string, age: number, email: string) {
    this.firstName = firstName;
    this.lastname = lastname;
    this.age = age;
    this.email = email;
  }
}
