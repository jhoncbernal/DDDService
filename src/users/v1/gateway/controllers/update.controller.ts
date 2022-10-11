import { inject, injectable } from 'inversify';
import { TYPES } from '@/shared/domain/d-injection/types';
import { CommandBus } from '@/shared/infrastructure/cqrs/command-bus/command.bus';
import { UserUpdateCommand } from '@/users/v1/application/update/command';
import { BaseController } from '@/shared/domain/controller/base.controller';
import { Logger } from '@/shared/infrastructure/logger/logger';

@injectable()
export class UserPutController extends BaseController {
  constructor(
    @inject(TYPES.CommandBus) private readonly commandBus: CommandBus,
    @inject(TYPES.Logger) logger: Logger
  ) {
    super(logger);
  }

  async updateUser({
    id,
    name,
    email,
    phone,
    company
  }: {
    id: string;
    name: string;
    email: string;
    phone: number;
    company: string;
  }) {
    try {
      const command = new UserUpdateCommand(id, name, email, phone, company);
      return await this.commandBus.dispatch(command);
    } catch (error: any) {
      throw this.mapperException(error?.message, {}, [], 'Users v1');
    }
  }
}
