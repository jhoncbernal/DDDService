import { Response } from '@/shared/domain/cqrs/query-bus/response';
import { UserEmail } from '@/users/v1/domain/user.email';
// Response
export class AuthResponse implements Response {
  private email: string;
  private token: string;

  constructor(email: string, token: string) {
    this.token = token;
    this.email = email;
  }

  static fromDomain(email: UserEmail, token: string): AuthResponse {
    return new AuthResponse(email.valueOf(), token);
  }

  getToken(): string {
    return this.token;
  }
  getEmail(): string {
    return this.email;
  }
}
