// CQRS command (from params)
import { Command } from '@/shared/domain/cqrs/command-bus/command';

export class UserUpdateCommand implements Command {
  private id: string;
  private name: string;
  private email: string;
  private phone: number;
  private company: string;
  private country_code: string;

  constructor(
    id: string,
    name: string,
    email: string,
    phone: number,
    company: string,
    country_code: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.company = company;
    this.country_code = country_code;
  }

  getId(): string {
    return this.id;
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
  getCountryCode(): string {
    return this.country_code;
  }
}
