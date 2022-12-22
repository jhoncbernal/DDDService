export class UpdatePasswordDto {
  constructor(
    public readonly password: string,
    public readonly new_password: string,
    public readonly authorization?: string
  ) {}

  static fromJSON(json: any): UpdatePasswordDto {
    return new UpdatePasswordDto(
      json.password,
      json.new_password,
      json?.authorization
    );
  }
  toJSON(): object {
    return {
      password: this.getPassword(),
      newPassword: this.getNewPassword(),
      authorization: this.getAuthorization()
    };
  }
  getPassword(): string {
    return this.password;
  }
  getNewPassword(): string {
    return this.new_password;
  }
  getAuthorization(): string | undefined {
    return this.authorization;
  }
}
