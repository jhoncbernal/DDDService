// CQRS command (from params)
import Crypt from '@/shared/infrastructure/security/crypt';
import { Command } from '@/shared/domain/cqrs/command-bus/command';
import { Identifier } from '@/shared/domain/value-objects/identifier';
export class UserCreateCommand implements Command {
  private name: string;
  private email: string;
  private phone: number;
  private company: string;
  private password: string;
  private role: string;
  private token: string;

  constructor(
    name: string,
    email: string,
    phone: number,
    company: string,
    password: string,
    role: string,
    token: string
  ) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.company = company;
    this.password = password;
    this.role = role;
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

  getPassword(): string {
    return Crypt.genHash(this.password);
  }

  getRole(): string {
    return this.role;
  }

  getToken(): string {
    return this.token;
  }
}
