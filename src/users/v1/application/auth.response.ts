import { User } from '@/users/v1/domain/user';
import { Response } from '@/shared/infrastructure/cqrs/query-bus/response';
import { UserEmail } from '../domain/user.email';
import { UserToken } from '../domain/user.token';
// Response
export class AuthResponse implements Response {
  private email: string;
  private token: string;

  constructor(email: string, token: string) {
    this.token = token;
    this.email = email;
  }

  static fromDomain(email: UserEmail, token: UserToken): AuthResponse {
    return new AuthResponse(email.valueOf(), token.valueOf());
  }

  getToken(): string {
    return this.token;
  }
  getEmail(): string {
    return this.email;
  }
}
