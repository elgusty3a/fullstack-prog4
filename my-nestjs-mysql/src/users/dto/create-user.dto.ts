export class CreateUserDto {
  firstName: string;
  lastName: string;
  birthDate: Date;
  email: string;

  constructor(
    fistName: string,
    lastName: string,
    birthDate: Date,
    email: string,
  ) {
    this.firstName = fistName;
    this.lastName = lastName;
    this.birthDate = birthDate;
    this.email = email;
  }
}
