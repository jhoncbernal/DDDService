import { inject, injectable } from 'inversify';
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
import { UserToken } from '@/users/v1/domain/user.token';
import { UserRole } from '@/users/v1/domain/roles/user.role';
import { UserPrivilage } from '../../domain/roles/privilages/user.privilage';

type Params = {
  userId: UserId;
  userName: UserName;
  userEmail: UserEmail;
  userPhone: UserPhone;
  userCompany: UserCompany;
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
    const userRole = new UserRole('');
    const userPrivilage = new UserPrivilage('');
    const userToken = new UserToken('');

    const user = new User(
      userId,
      userName,
      userEmail,
      userPhone,
      userCompany,
      userPassword,
      userRole,
      userPrivilage,
      userToken
    );

    const result = await this.userRepository.update(user);

    if (!result) {
      throw new UserNotFound(userId.valueOf());
    }
  }
}
