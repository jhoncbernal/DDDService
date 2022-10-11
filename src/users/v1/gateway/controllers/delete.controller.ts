import { inject, injectable } from 'inversify';
import { TYPES } from '@/shared/domain/d-injection/types';
import { CommandBus } from '@/shared/infrastructure/cqrs/command-bus/command.bus';
import { UserDeleteCommand } from '@/users/v1/application/delete/command';
import { BaseController } from '@/shared/domain/controller/base.controller';
import { Logger } from '@/shared/infrastructure/logger/logger';

@injectable()
export class UserDeleteController extends BaseController {
  constructor(
    @inject(TYPES.CommandBus) private readonly commandBus: CommandBus,
    @inject(TYPES.Logger) logger: Logger
  ) {
    super(logger);
  }

  async deleteUser({ id }: any) {
    try {
      const command = new UserDeleteCommand(id);
      return await this.commandBus.dispatch(command);
    } catch (error: any) {
      throw this.mapperException(error, {}, [], 'Users v1');
    }
  }
}
