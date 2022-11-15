import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { TYPES } from '@/users/v1/infrastructure/d-injection/types';
import { UseCase } from '@/shared/domain/use.case';

import { UserRepository } from '@/users/v1/domain/user.repository';
import { User } from '@/users/v1/domain/user';

import { UserEmail } from '@/users/v1/domain/user.email';
import { UserPassword } from '@/users/v1/domain/user.password';
import { UserNotFound } from '@/users/v1/domain/exceptions/not.found';
import { UserToken } from '@/users/v1/domain/user.token';
import { AuthResponse } from '@/users/v1/application/auth.response';

type Params = {
  userEmail: UserEmail;
  userPassword: UserPassword;
  userToken: UserToken;
};

@provide(TYPES.LoginUseCase)
export class LoginUseCase implements UseCase {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  async main(params: Params): Promise<AuthResponse> {
    let user: User | null = await this.userRepository.findBy(
      'email',
      params.userEmail
    );
    if (!user) {
      throw new UserNotFound(params.userEmail.valueOf());
    }
    if (!params.userPassword.equals(user.getPassword())) {
      throw new Error('Invalid password');
    }

    return AuthResponse.fromDomain(params.userEmail, params.userToken);
  }
}
