import { DomainEvent } from '@/shared/infrastructure/event-bus/domain.event';
import { CreateUserDomainEventBody } from '@/users/v1/infrastructure/user.created.domain.event';
import { permissions } from '@/users/v1/domain/permissions/user.permission';

export class UserCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'user.created';
  static readonly EVENT_TYPE = null;

  private id: string;
  private name: string;
  private email: string;
  private phone: number;
  private company: string;
  private password: string;
  private country_code: string;
  private permission: permissions;

  constructor(
    id: string,
    name: string,
    email: string,
    phone: number,
    company: string,
    password: string,
    country_code: string,
    permission: permissions
  ) {
    super(
      UserCreatedDomainEvent.EVENT_NAME,
      UserCreatedDomainEvent.EVENT_TYPE,
      id
    );
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.company = company;
    this.password = password;
    this.country_code = country_code;
    this.permission = permission;
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

  getPassword(): string {
    return this.password;
  }

  getCountryCode(): string {
    return this.country_code;
  }

  getPermission(): permissions {
    return this.permission;
  }

  toPrimitive(): CreateUserDomainEventBody {
    const {
      id,
      name,
      email,
      phone,
      company,
      password,
      country_code,
      permission
    } = this;
    return {
      id,
      name,
      email,
      phone,
      company,
      password,
      country_code,
      permission,
      eventName: UserCreatedDomainEvent.EVENT_NAME
    };
  }

  static fromPrimitives(
    id: string,
    body: CreateUserDomainEventBody
  ): DomainEvent {
    return new UserCreatedDomainEvent(
      id,
      body.name,
      body.email,
      body.phone,
      body.company,
      body.password,
      body.country_code,
      body.permission
    );
  }
}
