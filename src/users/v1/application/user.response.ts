import { User } from '@/users/v1/domain/user';
import { Response } from '@/shared/domain/cqrs/query-bus/response';
// Response
export class UserResponse implements Response {
  private id: string;
  private name: string;
  private email: string;
  private phone: number;
  private company: string;

  constructor(
    id: string,
    name: string,
    email: string,
    phone: number,
    company: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.company = company;
  }

  static fromDomain(user: User): UserResponse {
    return new UserResponse(
      user.getId().valueOf(),
      user.getName().valueOf(),
      user.getEmail().valueOf(),
      user.getPhone().valueOf(),
      user.getCompany().valueOf()
    );
  }

  getId(): string {
    return this.id;
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
}
