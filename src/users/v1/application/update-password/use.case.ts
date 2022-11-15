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

type Params = {
  userEmail: UserEmail;
  userPassword: UserPassword;
  userToken: UserToken;
};

@provide(TYPES.UpdateUserPasswordUseCase)
export class UpdateUserPasswordUseCase implements UseCase {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  async main(params: Params) {
    let user: User | null = await this.userRepository.findBy(
      'email',
      params.userEmail
    );
    if (!user) {
      throw new UserNotFound(params.userEmail.valueOf());
    }
    if (user.getToken().valueOf() !== params.userToken.valueOf()) {
      throw new Error('Invalid token');
    }
    user.getToken().clear();
    await this.userRepository.update(user);
  }
}
