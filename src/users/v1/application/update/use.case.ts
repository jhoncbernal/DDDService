import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { TYPES } from '@/users/v1/infrastructure/d-injection/types';
import { UseCase } from '@/shared/domain/use.case';
import { UserRepository } from '@/users/v1/domain/user.repository';
import { User } from '@/users/v1/domain/user';
import { UserId } from '@/users/v1/domain/user.id';
import { UserName } from '@/users/v1/domain/user.name';
import { UserEmail } from '@/users/v1/domain/user.email';
import { UserCompany } from '@/users/v1/domain/user.company';
import { UserPhone } from '@/users/v1/domain/user.phone';
import { UserNotFound } from '@/users/v1/domain/exceptions/not.found';
import { UserPassword } from '@/users/v1/domain/user.password';
import { UserCountryCode } from '@/users/v1/domain/user.country.code';

type Params = {
  userId: UserId;
  userName: UserName;
  userEmail: UserEmail;
  userPhone: UserPhone;
  userCompany: UserCompany;
  userCountryCode: UserCountryCode;
};

@provide(TYPES.UpdateUserUseCase)
export class UpdateUserUseCase implements UseCase {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  async main(params: Params) {
    const userId = params.userId;
    const userName = params.userName;
    const userEmail = params.userEmail;
    const userPhone = params.userPhone;
    const userCompany = params.userCompany;
    const userPassword = new UserPassword('');
    const userCountryCode = params.userCountryCode;

    const user = new User(
      userId,
      userName,
      userEmail,
      userPhone,
      userCompany,
      userPassword,
      userCountryCode
    );

    const result = await this.userRepository.update(user);

    if (!result) {
      throw new UserNotFound(userId.valueOf());
    }
  }
}
