// CQRS command (from params)
import { Command } from '@/shared/infrastructure/cqrs/command-bus/command';

export class UserUpdateCommand implements Command {
  private id: string;
  private name: string;
  private email: string;
  private phone: number;
  private company: string;

  constructor(
    id: string,
    name: string,
    email: string,
    phone: number,
    company: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.company = company;
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
}
