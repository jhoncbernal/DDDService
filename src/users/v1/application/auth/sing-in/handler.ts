import { inject, injectable } from 'inversify';
import { TYPES } from '@/users/v1/infrastructure/d-injection/types';
import { UserLoginQuery } from '@/users/v1/application/auth/sing-in/query';
import { LoginUseCase } from '@/users/v1/application/auth/sing-in/use.case';
import { UserEmail } from '@/users/v1/domain/user.email';
import { UserPassword } from '@/users/v1/domain/user.password';
import { Query } from '@/shared/domain/cqrs/query-bus/query';
import { QueryHandler } from '@/shared/domain/cqrs/query-bus/query.handler';
import { AuthResponse } from '@/users/v1/application/auth.response';

@injectable()
export class LoginUserHandler
  implements QueryHandler<UserLoginQuery, AuthResponse>
{
  constructor(
    @inject(TYPES.LoginUseCase)
    private readonly loginUseCase: LoginUseCase
  ) {}

  subscribedTo = (): Query => UserLoginQuery;

  async handle(query: UserLoginQuery): Promise<AuthResponse> {
    const userEmail = new UserEmail(query.getEmail());
    const userPassword = new UserPassword(query.getPassword());

    return await this.loginUseCase.main({
      userEmail,
      userPassword
    });
  }
}
