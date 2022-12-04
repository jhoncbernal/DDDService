import { inject, injectable } from 'inversify';
import { TYPES } from '@/shared/infrastructure/d-injection/types';
import { QueryBus } from '@/shared/domain/cqrs/query-bus/query.bus';
import { UserFindQuery } from '@/users/v1/application/find/query';
import { UserFindAllQuery } from '@/users/v1/application/find-all/query';
import { BaseController } from '@/shared/infrastructure/controller/base.controller';
import { Logger } from '@/shared/domain/logger/logger';

@injectable()
export class UserGetController extends BaseController {
  private errors = {
    UserRaceInvalid: { code: 'user-race-invalid', status: 404 }
  };
  constructor(
    @inject(TYPES.QueryBus) private readonly queryBus: QueryBus,
    @inject(TYPES.Logger) logger: Logger
  ) {
    super(logger);
  }

  async getUser({ id }: any) {
    try {
      const query = new UserFindQuery(id);
      return await this.queryBus.ask(query);
    } catch (error: any) {
      throw this.mapperException(error, {}, [], 'Users v1');
    }
  }

  async getAllUsers({ page, limit }: { page: number; limit: number }) {
    try {
      const query = new UserFindAllQuery(page, limit);
      return await this.queryBus.ask(query);
    } catch (error: any) {
      throw this.mapperException(error, {}, [], 'Users v1');
    }
  }
}
