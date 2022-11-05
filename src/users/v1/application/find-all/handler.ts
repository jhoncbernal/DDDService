import { inject, injectable } from 'inversify';
import { TYPES } from '@/users/v1/infrastructure/d-injection/types';
import { UserResponse } from '@/users/v1/application/user.response';
import { Query } from '@/shared/infrastructure/cqrs/query-bus/query';
import { QueryHandler } from '@/shared/infrastructure/cqrs/query-bus/query.handler';
import { FindAllUsersUseCase } from '@/users/v1/application/find-all/use.case';
import { UserFindAllQuery } from '@/users/v1/application/find-all/query';

@injectable()
export class FindAllUsersHandler
  implements QueryHandler<UserFindAllQuery, UserResponse[]>
{
  constructor(
    @inject(TYPES.FindAllUsersUseCase)
    private readonly findAllUsersUseCase: FindAllUsersUseCase
  ) {}

  subscribedTo = (): Query => UserFindAllQuery;
  handle(query: UserFindAllQuery): Promise<UserResponse[]> {
    return this.findAllUsersUseCase.main();
  }
}
