import { inject, injectable } from 'inversify';
import { TYPES } from '@/shared/infrastructure/d-injection/types';
import { CommandBus } from '@/shared/domain/cqrs/command-bus/command.bus';
import { UserUpdatePasswordCommand } from '@/users/v1/application/auth/update-password/command';
import { UserUpdateCommand } from '@/users/v1/application/update/command';

import { BaseController } from '@/shared/infrastructure/controller/base.controller';
import { Logger } from '@/shared/domain/logger/logger';
import { UserDto } from '@/users/v1/gateway/dto/user.dto';
import { UpdatePasswordDto } from '@/users/v1/gateway/dto/update-password.dto';

@injectable()
export class UserPutController extends BaseController {
  constructor(
    @inject(TYPES.CommandBus) private readonly commandBus: CommandBus,
    @inject(TYPES.Logger) logger: Logger
  ) {
    super(logger);
  }

  async updateUser(id: string, user: UserDto) {
    try {
      const command = new UserUpdateCommand(id, user);
      return await this.commandBus.dispatch(command);
    } catch (error: any) {
      throw this.mapperException(error?.message, {}, [], 'Users v1');
    }
  }

  async updateUserPassword(updatePasswordDto: UpdatePasswordDto) {
    try {
      const command = new UserUpdatePasswordCommand(updatePasswordDto);
      return await this.commandBus.dispatch(command);
    } catch (error: any) {
      throw this.mapperException(error?.message, {}, [], 'Users v1');
    }
  }
}
