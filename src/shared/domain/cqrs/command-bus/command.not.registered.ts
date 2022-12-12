import { Command } from '@/shared/domain/cqrs/command-bus/command';

export class CommandNotRegistered extends Error {
  constructor(command: Command) {
    super(
      `The command <${command.constructor.name}> hasn't a command handler associated`
    );
  }
}
