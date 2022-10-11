import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { TYPES } from '@/users/v1/infrastructure/d-injection/types';
import { TYPES as TYPES_SHARED } from '@/shared/domain/d-injection/types';
import { UseCase } from '@/shared/domain/use.case';
import { EventBus } from '@/shared/infrastructure/event-bus/event.bus';

import { UserRepository } from '@/users/v1/domain/user.repository';
import { User } from '@/users/v1/domain/user';
import { UserId } from '@/users/v1/domain/user.id';
import { UserName } from '@/users/v1/domain/user.name';

import { UserDate } from '@/users/v1/domain/user.date';
import { UserEmail } from '@/users/v1/domain/user.email';
import { UserPhone } from '@/users/v1/domain/user.phone';
import { UserCompany } from '@/users/v1/domain/user.company';

type Params = {
  userId: UserId;
  userName: UserName;
  userEmail: UserEmail;
  userPhone: UserPhone;
  userCompany: UserCompany;
  userDate: UserDate;
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
      params.userDate
    );

    await this.userRepository.save(user);

    await this.eventBus.publish(user.pullDomainEvents());
  }
}
