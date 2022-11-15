import { inject, injectable } from 'inversify';
import { TYPES } from '@/users/v1/infrastructure/d-injection/types';
import { Command } from '@/shared/infrastructure/cqrs/command-bus/command';
import { CommandHandler } from '@/shared/infrastructure/cqrs/command-bus/command.handler';
import { UserUpdatePasswordCommand } from '@/users/v1/application/update-password/command';
import { UpdateUserPasswordUseCase } from '@/users/v1/application/update-password/use.case';
import { UserPassword } from '@/users/v1/domain/user.password';
import { UserEmail } from '@/users/v1/domain/user.email';
import { UserToken } from '@/users/v1/domain/user.token';

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
    const userToken = new UserToken(command.getToken());
    const userEmail = new UserEmail(userToken.valueOf('email'));
    const userPassword = new UserPassword(command.getPassword());

    await this.updateUserPasswordUseCase.main({
      userEmail,
      userPassword,
      userToken
    });
  }
}
