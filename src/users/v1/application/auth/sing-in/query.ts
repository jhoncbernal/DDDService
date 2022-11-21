// CQRS command (from params)
import { Query } from '@/shared/infrastructure/cqrs/query-bus/query';
export class UserLoginQuery implements Query {
  private email: string;
  private password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }
}
