export class CreateUserDto {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;

  constructor(
    fistName: string,
    lastName: string,
    birthDate: string,
    email: string,
  ) {
    this.firstName = fistName;
    this.lastName = lastName;
    this.birthDate = birthDate;
    this.email = email;
  }
}
