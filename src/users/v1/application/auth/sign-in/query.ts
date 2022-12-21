// CQRS command (from params)
import { Query } from '@/shared/domain/cqrs/query-bus/query';
import { SignInDto } from '@/users/v1/gateway/dto/sign-in.dto';

export class UserLoginQuery implements Query {
  private signIn: SignInDto;

  constructor(signIn: SignInDto) {
    this.signIn = signIn;
  }

  getEmail(): string {
    return this.signIn.email;
  }

  getPassword(): string {
    return this.signIn.password;
  }
}
