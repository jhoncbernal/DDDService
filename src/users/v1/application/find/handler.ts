import { inject, injectable } from 'inversify';
import { TYPES } from '@/users/v1/infrastructure/d-injection/types';
import { FindUserUseCase } from '@/users/v1/application/find/use.case';
import { UserId } from '@/users/v1/domain/user.id';
import { UserResponse } from '@/users/v1/application/user.response';
import { UserFindQuery } from '@/users/v1/application/find/query';
import { Query } from '@/shared/infrastructure/cqrs/query-bus/query';
import { QueryHandler } from '@/shared/infrastructure/cqrs/query-bus/query.handler';

@injectable()
export class FindUserHandler
  implements QueryHandler<UserFindQuery, UserResponse>
{
  constructor(
    @inject(TYPES.FindUserUseCase)
    private readonly userFindUseCase: FindUserUseCase
  ) {}

  subscribedTo = (): Query => UserFindQuery;

  handle(query: UserFindQuery): Promise<UserResponse> {
    const userId = new UserId(query.getId());
    return this.userFindUseCase.main({ userId });
  }
}
