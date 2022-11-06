// CQRS command (from params)
import { DateTS } from '@/shared/domain/date/date';
import { Command } from '@/shared/infrastructure/cqrs/command-bus/command';
import { Identifier } from '@/shared/infrastructure/value-objects/identifier';
export class UserCreateCommand implements Command {
  private name: string;
  private email: string;
  private phone: number;
  private company: string;

  constructor(name: string, email: string, phone: number, company: string) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.company = company;
  }

  getId(): string {
    return Identifier.random().valueOf();
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  getPhone(): number {
    return this.phone;
  }

  getCompany(): string {
    return this.company;
  }

  getDate(): Date {
    return DateTS.getDate();
  }
}
