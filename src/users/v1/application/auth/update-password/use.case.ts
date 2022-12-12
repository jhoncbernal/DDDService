import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { TYPES } from '@/users/v1/infrastructure/d-injection/types';
import { UseCase } from '@/shared/domain/use.case';
import { UserRepository } from '@/users/v1/domain/user.repository';
import { UserNotFound } from '@/users/v1/domain/exceptions/not.found';
import { UserPassword } from '@/users/v1/domain/user.password';
import { UserEmail } from '@/users/v1/domain/user.email';
import { UserToken } from '@/users/v1/domain/user.token';
import { User } from '@/users/v1/domain/user';
import { JsonWebToken } from '@/shared/infrastructure/security/jwt';

type Params = {
  userPassword: UserPassword;
  userNewPassword: UserPassword;
  userToken: UserToken;
};

@provide(TYPES.UpdateUserPasswordUseCase)
export class UpdateUserPasswordUseCase implements UseCase {
  private jwt: JsonWebToken;
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: UserRepository
  ) {
    this.jwt = new JsonWebToken();
  }

  async main(params: Params) {
    const decode = this.jwt.decode(params.userToken.valueOf());
    if (!decode) throw new Error('Invalid token');

    const userEmail = new UserEmail(decode.email);

    let user: User | null = await this.userRepository.findBy(
      'email',
      userEmail
    );
    if (!user) throw new UserNotFound(userEmail.valueOf());
    if (
      !params.userPassword.valueOf() &&
      !user.getToken()?.equals(params.userToken)
    ) {
      throw new Error('Invalid token');
    }
    if (!params.userToken && !params.userPassword.equals(user.getPassword())) {
      throw new Error('Invalid password');
    }
    if (params.userNewPassword.equals(user.getPassword())) {
      throw new Error('You cannot use the same password');
    }

    await this.userRepository.updatePassword(
      user.getId().valueOf(),
      params.userNewPassword.valueOf(true)
    );
  }
}
