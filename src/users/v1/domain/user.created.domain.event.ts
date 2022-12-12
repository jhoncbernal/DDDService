import { DomainEvent } from '@/shared/infrastructure/event-bus/domain.event';
import { CreateUserDomainEventBody } from '@/users/v1/infrastructure/user.created.domain.event';
import { privilege } from '@/users/v1/domain/roles/privilages/user.privilage';

export class UserCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'user.created';
  static readonly EVENT_TYPE = null;

  private id: string;
  private name: string;
  private email: string;
  private phone: number;
  private company: string;
  private password: string;
  private privilage: privilege;

  constructor(
    id: string,
    name: string,
    email: string,
    phone: number,
    company: string,
    password: string,
    privilage: privilege
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
    this.privilage = privilage;
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

  getPrivilage(): privilege {
    return this.privilage;
  }

  toPrimitive(): CreateUserDomainEventBody {
    const { id, name, email, phone, company, password, privilage } = this;
    return {
      id,
      name,
      email,
      phone,
      company,
      password,
      privilage,
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
      body.privilage
    );
  }
}
