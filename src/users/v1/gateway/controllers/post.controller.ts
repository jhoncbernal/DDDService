import { inject, injectable } from 'inversify';
import { TYPES } from '@/shared/infrastructure/d-injection/types';
import { CommandBus } from '@/shared/domain/cqrs/command-bus/command.bus';
import { UserCreateCommand } from '@/users/v1/application/auth/sing-up/command';
import { BaseController } from '@/shared/infrastructure/controller/base.controller';
import { Logger } from '@/shared/domain/logger/logger';
import { Exception } from '@/shared/domain/controller/base.controller';
import { UserLoginQuery } from '@/users/v1/application/auth/sing-in/query';
import { QueryBus } from '@/shared/domain/cqrs/query-bus/query.bus';

@injectable()
export class UserPostController extends BaseController {
  constructor(
    @inject(TYPES.CommandBus) private readonly commandBus: CommandBus,
    @inject(TYPES.QueryBus) private readonly queryBus: QueryBus,
    @inject(TYPES.Logger) logger: Logger
  ) {
    super(logger);
  }

  async createUser({
    name,
    email,
    phone,
    company,
    password,
    role,
    token
  }: {
    name: string;
    email: string;
    phone: number;
    company: string;
    password: string;
    role: string;
    token: string;
  }) {
    try {
      const command = new UserCreateCommand(
        name,
        email,
        phone,
        company,
        password,
        role,
        token
      );
      return await this.commandBus.ask(command);
    } catch (error: any) {
      throw this.mapperException(error, {}, [], 'Users v1');
    }
  }

  async login({ email, password }: { email: string; password: string }) {
    try {
      const command = new UserLoginQuery(email, password);
      return await this.queryBus.ask(command);
    } catch (error: any) {
      throw this.mapperException(error, {}, [], 'Users v1');
    }
  }
}
