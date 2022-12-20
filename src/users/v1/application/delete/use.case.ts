import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { TYPES } from '@/users/v1/infrastructure/d-injection/types';
import { UseCase } from '@/shared/domain/use.case';
import { UserRepository } from '@/users/v1/domain/user.repository';
import { UserId } from '@/users/v1/domain/user.id';
import { UserNotFound } from '@/users/v1/domain/exceptions/not.found';

type Params = {
  userId: UserId;
};

@provide(TYPES.DeleteUserUseCase)
export class DeleteUserUseCase implements UseCase {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  async main(params: Params) {
    const userId = new UserId(params.userId.valueOf());

    const result = await this.userRepository.delete(userId);
    if (!result) {
      throw new UserNotFound(userId.valueOf());
    }
  }
}
