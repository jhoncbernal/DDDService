import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { TYPES } from '@/users/v1/infrastructure/d-injection/types';
import { UseCase } from '@/shared/domain/use.case';
import { UserResponse } from '@/users/v1/application/user.response';
import { UserRepository } from '@/users/v1/domain/user.repository';

type Params = {
  page: number;
  limit: number;
};
@provide(TYPES.FindAllUsersUseCase)
export class FindAllUsersUseCase implements UseCase {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  async main(params: Params): Promise<UserResponse[]> {
    const users = await this.userRepository.findAll(params.limit, params.page);

    return users.map((user) => UserResponse.fromDomain(user));
  }
}
