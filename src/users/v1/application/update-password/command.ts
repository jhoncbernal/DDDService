// CQRS command (from params)
import { Command } from '@/shared/infrastructure/cqrs/command-bus/command';

export class UserUpdatePasswordCommand implements Command {
  private token: string | string[] | undefined;
  private password: string;

  constructor(token: string | string[] | undefined, password: string) {
    this.token = token;
    this.password = password;
  }

  getToken(): string {
    if (typeof this.token === 'string') return this.token;
    return '';
  }

  getPassword(): string {
    return this.password;
  }
}
