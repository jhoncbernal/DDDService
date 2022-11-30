import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { TYPES } from '@/users/v1/infrastructure/d-injection/types';
import { UseCase } from '@/shared/domain/use.case';

import { UserRepository } from '@/users/v1/domain/user.repository';
import { User } from '@/users/v1/domain/user';

import { UserEmail } from '@/users/v1/domain/user.email';
import { UserPassword } from '@/users/v1/domain/user.password';
import { UserNotFound } from '@/users/v1/domain/exceptions/not.found';
import { AuthResponse } from '@/users/v1/application/auth.response';
import { JsonWebToken } from '@/shared/domain/security/jwt';

type Params = {
  userEmail: UserEmail;
  userPassword: UserPassword;
};

@provide(TYPES.LoginUseCase)
export class LoginUseCase implements UseCase {
  private jwt: JsonWebToken;
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: UserRepository
  ) {
    this.jwt = new JsonWebToken();
  }

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
    const token = this.jwt.sign(
      {
        email: params.userEmail.valueOf(),
        deviceId: '2122321312',
        role: user.getRole().valueOf()
      },
      '3m'
    );
    return AuthResponse.fromDomain(params.userEmail, token);
  }
}
