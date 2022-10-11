import { Command } from '@/shared/infrastructure/cqrs/command-bus/command';
import { Response } from '@/shared/infrastructure/cqrs/command-bus/response';

export interface CommandBus {
  dispatch(command: Command): Promise<void>;
  ask<R extends Response>(command: Command): Promise<R>;
}
