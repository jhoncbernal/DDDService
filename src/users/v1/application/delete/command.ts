// CQRS command (from params)
import { Command } from '@/shared/infrastructure/cqrs/command-bus/command';

export class UserDeleteCommand implements Command {
  private id: string;

  constructor(id: string) {
    this.id = id;
  }

  getId(): string {
    return this.id;
  }
}
