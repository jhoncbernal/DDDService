import { DomainEvent } from '@/shared/domain/event-bus/domain.event';
import { CreateUserDomainEventBody } from '@/users/v1/infrastructure/user.created.domain.event';

export class UserCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'user.created';
  static readonly EVENT_TYPE = null;

  private id: string;
  private name: string;
  private email: string;
  private phone: number;
  private company: string;
  private date: Date;

  constructor(
    id: string,
    name: string,
    email: string,
    phone: number,
    company: string,
    occurredAt: Date
  ) {
    super(
      UserCreatedDomainEvent.EVENT_NAME,
      UserCreatedDomainEvent.EVENT_TYPE,
      id,
      occurredAt
    );
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.company = company;
    this.date = occurredAt;
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

  getDate(): Date {
    return this.date;
  }
  toPrimitive(): CreateUserDomainEventBody {
    const { id, name, email, phone, company, date } = this;
    return {
      id,
      name,
      email,
      phone,
      company,
      date,
      eventName: UserCreatedDomainEvent.EVENT_NAME
    };
  }

  static fromPrimitives(
    id: string,
    body: CreateUserDomainEventBody,
    occurredAt: Date
  ): DomainEvent {
    return new UserCreatedDomainEvent(
      id,
      body.name,
      body.email,
      body.phone,
      body.company,
      occurredAt
    );
  }
}
