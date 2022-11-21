import { inject, injectable } from 'inversify';
import { TYPES } from '@/users/v1/infrastructure/d-injection/types';
import { Command } from '@/shared/infrastructure/cqrs/command-bus/command';
import { CommandHandler } from '@/shared/infrastructure/cqrs/command-bus/command.handler';
import { UserCreateCommand } from '@/users/v1/application/auth/sing-up/command';
import { CreateUserUseCase } from '@/users/v1/application/auth/sing-up/use.case';
import { UserId } from '@/users/v1/domain/user.id';
import { UserName } from '@/users/v1/domain/user.name';
import { UserEmail } from '@/users/v1/domain/user.email';
import { UserCompany } from '@/users/v1/domain/user.company';
import { UserPhone } from '@/users/v1/domain/user.phone';
import { UserPassword } from '@/users/v1/domain/user.password';
import { UserToken } from '@/users/v1/domain/user.token';

@injectable()
export class CreateUserHandler implements CommandHandler<UserCreateCommand> {
  constructor(
    @inject(TYPES.CreateUserUseCase)
    private readonly createUserUseCase: CreateUserUseCase
  ) {}

  subscribedTo = (): Command => UserCreateCommand;

  async handle(command: UserCreateCommand): Promise<void> {
    const userId = new UserId(command.getId());
    const userName = new UserName(command.getName());
    const userEmail = new UserEmail(command.getEmail());
    const userPhone = new UserPhone(command.getPhone());
    const userCompany = new UserCompany(command.getCompany());
    const userPassword = new UserPassword(command.getPassword());
    const userToken = new UserToken(command.getToken());

    await this.createUserUseCase.main({
      userId,
      userName,
      userEmail,
      userPhone,
      userCompany,
      userPassword,
      userToken
    });
  }
}
