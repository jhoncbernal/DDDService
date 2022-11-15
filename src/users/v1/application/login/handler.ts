import { inject, injectable } from 'inversify';
import { TYPES } from '@/users/v1/infrastructure/d-injection/types';
import { UserLoginQuery } from '@/users/v1/application/login/query';
import { LoginUseCase } from '@/users/v1/application/login/use.case';
import { UserEmail } from '@/users/v1/domain/user.email';
import { UserPassword } from '@/users/v1/domain/user.password';
import { UserToken } from '@/users/v1/domain/user.token';
import { Query } from '@/shared/infrastructure/cqrs/query-bus/query';
import { QueryHandler } from '@/shared/infrastructure/cqrs/query-bus/query.handler';
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
    const userToken = new UserToken(userEmail.valueOf());

    return await this.loginUseCase.main({
      userEmail,
      userPassword,
      userToken
    });
  }
}
