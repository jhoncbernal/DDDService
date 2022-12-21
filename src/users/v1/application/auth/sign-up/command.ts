// CQRS command (from params)
import { Command } from '@/shared/domain/cqrs/command-bus/command';
import { Identifier } from '@/shared/domain/value-objects/identifier';
import { UserDto } from '@/users/v1/gateway/dto/user.dto';
export class UserCreateCommand implements Command {
  private user: UserDto;

  constructor(user: UserDto) {
    this.user = user;
  }

  getId(): string {
    return Identifier.random().valueOf();
  }

  getName(): string {
    return this.user.getName();
  }

  getEmail(): string {
    return this.user.getEmail();
  }

  getPhone(): number {
    return this.user.getPhone();
  }

  getCompany(): string {
    return this.user.getCompany();
  }

  getPassword(): string {
    return this.user.getPassword();
  }

  getCountryCode(): string {
    return this.user.getCountryCode();
  }

  getRole(): string {
    return this.user.getRole();
  }
}
