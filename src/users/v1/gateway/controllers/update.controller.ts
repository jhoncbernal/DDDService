import { inject, injectable } from 'inversify';
import { TYPES } from '@/shared/infrastructure/d-injection/types';
import { CommandBus } from '@/shared/domain/cqrs/command-bus/command.bus';
import { UserUpdatePasswordCommand } from '@/users/v1/application/auth/update-password/command';
import { UserUpdateCommand } from '@/users/v1/application/update/command';

import { BaseController } from '@/shared/infrastructure/controller/base.controller';
import { Logger } from '@/shared/domain/logger/logger';

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

  async updateUserPassword({
    authorization,
    password,
    new_password
  }: {
    authorization: string | undefined;
    new_password: string | undefined;
    password: string;
  }) {
    try {
      const command = new UserUpdatePasswordCommand(
        authorization,
        password,
        new_password
      );
      return await this.commandBus.dispatch(command);
    } catch (error: any) {
      throw this.mapperException(error?.message, {}, [], 'Users v1');
    }
  }
}
