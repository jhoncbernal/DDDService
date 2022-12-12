import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { TYPES } from '@/users/v1/infrastructure/d-injection/types';
import { UseCase } from '@/shared/domain/use.case';
import { UserRepository } from '@/users/v1/domain/user.repository';
import { UserNotFound } from '@/users/v1/domain/exceptions/not.found';
import { UserPassword } from '@/users/v1/domain/user.password';
import { UserEmail } from '@/users/v1/domain/user.email';
import { User } from '@/users/v1/domain/user';
import { JsonWebToken } from '@/shared/infrastructure/security/jwt';
import { UserInvalid } from '@/users/v1/domain/exceptions/invalid';

type Params = {
  userPassword: UserPassword;
  userNewPassword: UserPassword;
  userToken: string;
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
    try {
      // validate token
      const decode: any = this.jwt.verify(params.userToken.valueOf());
      // get user by email
      const userEmail = new UserEmail(decode?.email);
      let user: User | null = await this.userRepository.findBy(
        'email',
        userEmail
      );
      if (!user) throw new UserNotFound(userEmail.valueOf());

      // validate password
      if (
        !params.userToken &&
        !params.userPassword.equals(user.getPassword())
      ) {
        throw new UserInvalid('password');
      }
      if (params.userNewPassword.equals(user.getPassword())) {
        throw new Error('You cannot use the same password');
      }

      // update password
      await this.userRepository.updatePassword(
        user.getId(),
        params.userNewPassword
      );
    } catch (error) {
      throw new UserInvalid('token');
    }
  }
}
