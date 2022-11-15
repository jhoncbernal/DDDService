import { inject, injectable } from 'inversify';
import { TYPES } from '@/shared/domain/d-injection/types';
import { CommandBus } from '@/shared/infrastructure/cqrs/command-bus/command.bus';
import { UserCreateCommand } from '@/users/v1/application/create/command';
import { BaseController } from '@/shared/domain/controller/base.controller';
import { Logger } from '@/shared/infrastructure/logger/logger';
import { Exception } from '@/shared/infrastructure/controller/base.controller';

@injectable()
export class UserPostController extends BaseController {
  constructor(
    @inject(TYPES.CommandBus) private readonly commandBus: CommandBus,
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
    token
  }: {
    name: string;
    email: string;
    phone: number;
    company: string;
    password: string;
    token: string;
  }) {
    try {
      const command = new UserCreateCommand(
        name,
        email,
        phone,
        company,
        password,
        token
      );
      return await this.commandBus.ask(command);
    } catch (error: any) {
      throw this.mapperException(error, {}, [], 'Users v1');
    }
  }
}
