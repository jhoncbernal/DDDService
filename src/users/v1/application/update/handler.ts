import { inject, injectable } from 'inversify';
import { TYPES } from '@/users/v1/infrastructure/d-injection/types';
import { Command } from '@/shared/domain/cqrs/command-bus/command';
import { CommandHandler } from '@/shared/domain/cqrs/command-bus/command.handler';
import { UserUpdateCommand } from '@/users/v1/application/update/command';
import { UpdateUserUseCase } from '@/users/v1/application/update/use.case';
import { UserId } from '@/users/v1/domain/user.id';
import { UserName } from '@/users/v1/domain/user.name';
import { UserEmail } from '@/users/v1/domain/user.email';
import { UserCompany } from '@/users/v1/domain/user.company';
import { UserPhone } from '@/users/v1/domain/user.phone';

@injectable()
export class UpdateUserHandler implements CommandHandler<UserUpdateCommand> {
  constructor(
    @inject(TYPES.UpdateUserUseCase)
    private readonly updateUserUseCase: UpdateUserUseCase
  ) {}

  subscribedTo = (): Command => UserUpdateCommand;

  async handle(command: UserUpdateCommand): Promise<void> {
    const userId = new UserId(command.getId());
    const userName = new UserName(command.getName());
    const userEmail = new UserEmail(command.getEmail());
    const userPhone = new UserPhone(command.getPhone());
    const userCompany = new UserCompany(command.getCompany());

    await this.updateUserUseCase.main({
      userId,
      userName,
      userEmail,
      userPhone,
      userCompany
    });
  }
}
