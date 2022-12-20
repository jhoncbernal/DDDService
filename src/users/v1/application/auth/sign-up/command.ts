// CQRS command (from params)
import { Command } from '@/shared/domain/cqrs/command-bus/command';
import { Identifier } from '@/shared/domain/value-objects/identifier';
export class UserCreateCommand implements Command {
  private name: string;
  private email: string;
  private phone: number;
  private company: string;
  private password: string;
  private role: string;
  private country_code: string;

  constructor(
    name: string,
    email: string,
    phone: number,
    company: string,
    password: string,
    role: string,
    country_code: string
  ) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.company = company;
    this.password = password;
    this.role = role;
    this.country_code = country_code;
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

  getPassword(): string {
    return this.password;
  }

  getRole(): string {
    return this.role;
  }

  getCountryCode(): string {
    return this.country_code;
  }
}
