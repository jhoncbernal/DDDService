// CQRS command (from params)
import { DateTS } from '@/shared/domain/date/date';
import Crypt from '@/shared/domain/security/crypt';
import { Command } from '@/shared/infrastructure/cqrs/command-bus/command';
import { Identifier } from '@/shared/infrastructure/value-objects/identifier';
export class UserCreateCommand implements Command {
  private name: string;
  private email: string;
  private phone: number;
  private company: string;
  private password: string;
  private token: string;

  constructor(
    name: string,
    email: string,
    phone: number,
    company: string,
    password: string,
    token: string
  ) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.company = company;
    this.password = password;
    this.token = token;
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

  getPassword(): string {
    return Crypt.genHash(this.password);
  }

  getToken(): string {
    return this.token;
  }
}
