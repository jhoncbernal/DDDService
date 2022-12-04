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

    if (!user.getToken()?.equals(params.userToken)) {
      throw new Error('Invalid token');
    }
    user.getToken()?.clear();
    await this.userRepository.update(user);
  }
}
