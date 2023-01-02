import { inject, injectable } from 'inversify';
import { TYPES } from '@/shared/infrastructure/d-injection/types';
import { CommandBus } from '@/shared/domain/cqrs/command-bus/command.bus';
import { UserCreateCommand } from '@/users/v1/application/auth/sign-up/command';
import { BaseController } from '@/shared/infrastructure/controller/base.controller';
import { Logger } from '@/shared/domain/logger/logger';
import { UserLoginQuery } from '@/users/v1/application/auth/sign-in/query';
import { QueryBus } from '@/shared/domain/cqrs/query-bus/query.bus';
import { UserDto } from '@/users/v1/gateway/dto/user.dto';
import { SignInDto } from '@/users/v1/gateway/dto/sign-in.dto';

@injectable()
export class UserPostController extends BaseController {
  constructor(
    @inject(TYPES.CommandBus) private readonly commandBus: CommandBus,
    @inject(TYPES.QueryBus) private readonly queryBus: QueryBus,
    @inject(TYPES.Logger) logger: Logger
  ) {
    super(logger);
  }

  async createUser(user: UserDto) {
    try {
      const command = new UserCreateCommand(user);
      return await this.commandBus.ask(command);
    } catch (error: any) {
      throw this.mapperException(error, {}, [], 'Users v1');
    }
  }

  async login(signIn: SignInDto) {
    try {
      const command = new UserLoginQuery(signIn);
      return await this.queryBus.ask(command);
    } catch (error: any) {
      throw this.mapperException(error, {}, [], 'Users v1');
    }
  }
}
