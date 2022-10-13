import { Command } from '@/shared/infrastructure/cqrs/command-bus/command';
import { CommandBus } from '@/shared/infrastructure/cqrs/command-bus/command.bus';
import { CommandHandler } from '@/shared/infrastructure/cqrs/command-bus/command.handler';
import { CommandNotRegistered } from '@/shared/infrastructure/cqrs/command-bus/command.not.registered';
import { Response } from '@/shared/infrastructure/cqrs/command-bus/response';
import { TYPES } from '@/shared/domain/d-injection/types';
import { inject, injectable, multiInject } from 'inversify';
@injectable()
export class InMemoryCommandBus implements CommandBus {
  private commandHandlersMap: Map<Command, CommandHandler<Command>>;

  constructor(
    @multiInject(TYPES.CommandBusHandler)
    commandHandlers: Array<CommandHandler<Command>>
  ) {
    this.commandHandlersMap = this.formatHandlers(commandHandlers);
  }

  async dispatch(command: Command): Promise<void> {
    const handler = this.search(command);

    await handler.handle(command);
  }

  async ask<R extends Response>(command: Command): Promise<R> {
    const handler: any = this.search(command);
    return handler.handle(command) as Promise<R>;
  }

  private formatHandlers(
    commandHandlers: Array<CommandHandler<Command>>
  ): Map<Command, CommandHandler<Command>> {
    const handlersMap = new Map();

    commandHandlers.forEach((commandHandler) => {
      handlersMap.set(commandHandler.subscribedTo(), commandHandler);
    });

    return handlersMap;
  }

  private search(command: Command): CommandHandler<Command> {
    const commandHandler = this.commandHandlersMap.get(command.constructor);

    if (!commandHandler) {
      throw new CommandNotRegistered(command);
    }

    return commandHandler;
  }
}
