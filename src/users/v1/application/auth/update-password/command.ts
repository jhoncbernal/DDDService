// CQRS command (from params)
import { Command } from '@/shared/domain/cqrs/command-bus/command';
type StringUndefined = string | string[] | undefined;
export class UserUpdatePasswordCommand implements Command {
  private token: StringUndefined;
  private password: StringUndefined;
  private new_password: StringUndefined;

  constructor(
    token: StringUndefined,
    password: string,
    new_password: StringUndefined
  ) {
    this.token = token;
    this.password = password;
    this.new_password = new_password;
  }

  getToken(): string {
    return this.default(this.token);
  }

  getPassword(): string {
    return this.default(this.password);
  }

  getNewPassword(): string {
    return this.default(this.new_password);
  }

  private default(value: StringUndefined): string {
    if (typeof value === 'string') return value;
    return '';
  }
}
