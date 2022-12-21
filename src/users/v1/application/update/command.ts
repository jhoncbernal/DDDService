// CQRS command (from params)
import { Command } from '@/shared/domain/cqrs/command-bus/command';
import { UserDto } from '../../gateway/dto/user.dto';

export class UserUpdateCommand implements Command {
  private id: string;
  private user: UserDto;

  constructor(id: string, user: UserDto) {
    this.id = id;
    this.user = user;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.user.name;
  }

  getEmail(): string {
    return this.user.email;
  }

  getPhone(): number {
    return this.user.phone;
  }

  getCompany(): string {
    return this.user.company;
  }
  getCountryCode(): string {
    return this.user.country_code;
  }
}
