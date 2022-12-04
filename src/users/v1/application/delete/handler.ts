import { inject, injectable } from 'inversify';
import { TYPES } from '@/users/v1/infrastructure/d-injection/types';
import { Command } from '@/shared/domain/cqrs/command-bus/command';
import { CommandHandler } from '@/shared/domain/cqrs/command-bus/command.handler';
import { UserDeleteCommand } from '@/users/v1/application/delete/command';
import { DeleteUserUseCase } from '@/users/v1/application/delete/use.case';
import { UserId } from '@/users/v1/domain/user.id';

@injectable()
export class DeleteUserHandler implements CommandHandler<UserDeleteCommand> {
  constructor(
    @inject(TYPES.DeleteUserUseCase)
    private readonly deleteUserUseCase: DeleteUserUseCase
  ) {}

  subscribedTo = (): Command => UserDeleteCommand;

  async handle(command: UserDeleteCommand): Promise<void> {
    const userId = new UserId(command.getId());
    await this.deleteUserUseCase.main({ userId });
  }
}
