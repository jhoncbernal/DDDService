import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { TYPES } from '@/users/v1/infrastructure/d-injection/types';
import { TYPES as TYPES_SHARED } from '@/shared/infrastructure/d-injection/types';
import { UseCase } from '@/shared/domain/use.case';
import { EventBus } from '@/shared/domain/event-bus/event.bus';

import { UserRepository } from '@/users/v1/domain/user.repository';
import { User } from '@/users/v1/domain/user';
import { UserId } from '@/users/v1/domain/user.id';
import { UserName } from '@/users/v1/domain/user.name';

import { UserEmail } from '@/users/v1/domain/user.email';
import { UserPhone } from '@/users/v1/domain/user.phone';
import { UserCompany } from '@/users/v1/domain/user.company';
import { UserPassword } from '@/users/v1/domain/user.password';
import { UserToken } from '@/users/v1/domain/user.token';
import { UserPrivilage } from '@/users/v1/domain/roles/privilages/user.privilage';
import { UserRole } from '@/users/v1/domain/roles/user.role';

type Params = {
  userId: UserId;
  userName: UserName;
  userEmail: UserEmail;
  userPhone: UserPhone;
  userCompany: UserCompany;
  userPassword: UserPassword;
  userRole: UserRole;
  userPrivilage: UserPrivilage;
  userToken: UserToken;
};

@provide(TYPES.CreateUserUseCase)
export class CreateUserUseCase implements UseCase {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: UserRepository,
    @inject(TYPES_SHARED.EventBus) private readonly eventBus: EventBus
  ) {}

  async main(params: Params) {
    const user = User.create(
      params.userId,
      params.userName,
      params.userEmail,
      params.userPhone,
      params.userCompany,
      params.userPassword,
      params.userRole,
      params.userPrivilage,
      params.userToken
    );

    await this.userRepository.save(user);

    await this.eventBus.publish(user.pullDomainEvents());
  }
}
