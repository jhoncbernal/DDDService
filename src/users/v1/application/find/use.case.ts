import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { TYPES } from '@/users/v1/infrastructure/d-injection/types';
import { UseCase } from '@/shared/domain/use.case';
import { UserResponse } from '@/users/v1/application/user.response';
import { UserId } from '@/users/v1/domain/user.id';
import { UserRepository } from '@/users/v1/domain/user.repository';
import { UserNotFound } from '@/users/v1/domain/exceptions/not.found';

type Params = {
  userId: UserId;
};

@provide(TYPES.FindUserUseCase)
export class FindUserUseCase implements UseCase {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  async main(params: Params): Promise<UserResponse> {
    const user = await this.userRepository.findById(params.userId);
    if (!user) {
      throw new UserNotFound(params.userId.valueOf());
    }
    return UserResponse.fromDomain(user);
  }
}
