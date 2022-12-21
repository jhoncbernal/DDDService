export class SignInDto {
  constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  static fromJSON(json: any): SignInDto {
    return new SignInDto(json.email, json.password);
  }
  toJSON(): object {
    return {
      email: this.getEmail(),
      password: this.getPassword()
    };
  }
  getEmail(): string {
    return this.email;
  }
  getPassword(): string {
    return this.password;
  }
}
