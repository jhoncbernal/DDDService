import { User } from '@/users/v1/domain/user';
export class UserDto {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly phone: number,
    public readonly company: string,
    public readonly password: string,
    public readonly country_code: string,
    public readonly role: string | undefined,
    public readonly permissions: { resource: string; actions: string[] }[]
  ) {}

  static fromJSON(json: any): UserDto {
    return new UserDto(
      json.name,
      json.email,
      json.phone,
      json.company,
      json.password,
      json.country_code,
      json.role,
      json.permissions
    );
  }
  toJSON(): object {
    return {
      id: this.getId(),
      name: this.getName(),
      email: this.getEmail(),
      phone: this.getPhone(),
      company: this.getCompany(),
      password: this.getPassword(),
      country_code: this.getCountryCode(),
      role: this.getRole()
    };
  }

  toDomain(): User {
    return User.fromPrimitives(
      this.getId(),
      this.getName(),
      this.getEmail(),
      this.getPhone(),
      this.getCompany(),
      this.getPassword(),
      this.getCountryCode(),
      this.getRole(),
      this.getPermissions()
    );
  }

  getId(): string {
    return '';
  }
  getName(): string {
    return this.name;
  }
  getEmail(): string {
    return this.email;
  }
  getPhone(): number {
    return this.phone;
  }
  getCompany(): string {
    return this.company;
  }
  getPassword(): string {
    return this.password;
  }
  getCountryCode(): string {
    return this.country_code;
  }
  getRole(): string {
    return this.role ? this.role : '';
  }
  getPermissions(): { resource: string; actions: string[] }[] {
    return this.permissions ? this.permissions : [];
  }
  getResouces(): string[] {
    return this.permissions
      ? this.permissions.map((permission) => permission.resource)
      : [];
  }
}
