import { inject, injectable } from 'inversify';
import { TYPES } from '@/users/v1/infrastructure/d-injection/types';
import { Command } from '@/shared/domain/cqrs/command-bus/command';
import { CommandHandler } from '@/shared/domain/cqrs/command-bus/command.handler';
import { UserUpdatePasswordCommand } from '@/users/v1/application/auth/update-password/command';
import { UpdateUserPasswordUseCase } from '@/users/v1/application/auth/update-password/use.case';
import { UserPassword } from '@/users/v1/domain/user.password';

@injectable()
export class UpdateUserPasswordHandler
  implements CommandHandler<UserUpdatePasswordCommand>
{
  constructor(
    @inject(TYPES.UpdateUserPasswordUseCase)
    private readonly updateUserPasswordUseCase: UpdateUserPasswordUseCase
  ) {}

  subscribedTo = (): Command => UserUpdatePasswordCommand;

  async handle(command: UserUpdatePasswordCommand): Promise<void> {
    const userToken = command.getToken();
    const userPassword = new UserPassword(command.getPassword());
    const userNewPassword = new UserPassword(command.getNewPassword());

    await this.updateUserPasswordUseCase.main({
      userPassword,
      userNewPassword,
      userToken
    });
  }
}
