import { Command } from '@/shared/domain/cqrs/command-bus/command';
import { Response } from '@/shared/domain/cqrs/command-bus/response';

export interface CommandBus {
  dispatch(command: Command): Promise<void>;
  ask<R extends Response>(command: Command): Promise<R>;
}
