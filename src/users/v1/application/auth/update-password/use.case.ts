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
import validate from '@/shared/infrastructure/validator/validator';
import { UserAction } from '@/users/v1/domain/permissions/user.action';
import { UserResource } from '@/users/v1/domain/permissions/user.resource';

type Params = {
  userPassword: UserPassword;
  userNewPassword: UserPassword;
  userEmail: UserEmail;
};

@provide(TYPES.UpdateUserPasswordUseCase)
export class UpdateUserPasswordUseCase implements UseCase {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  async main(params: Params) {
    try {
      let user: User | null | undefined = await this.userRepository.findBy(
        'email',
        params.userEmail
      );
      if (!user) throw new UserNotFound(params.userEmail.valueOf());
      // validate password
      const invalidPassword = !params.userPassword.equals(user.getPassword());
      if (invalidPassword && !validate.isEmpty(params.userPassword.valueOf())) {
        throw new UserInvalid('password');
      }
      if (params.userNewPassword.equals(user.getPassword())) {
        throw new Error('You cannot use the same password');
      }

      // update password
      return await this.userRepository.updatePassword(
        user.getId(),
        params.userNewPassword
      );
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
