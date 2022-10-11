import { Entity } from '@/shared/domain/entity';

import { UserId } from '@/users/v1/domain/user.id';
import { UserName } from '@/users/v1/domain/user.name';
import { UserEmail } from '@/users/v1/domain/user.email';
import { UserPhone } from '@/users/v1/domain/user.phone';
import { UserCompany } from '@/users/v1/domain/user.company';
import { UserDate } from '@/users/v1/domain/user.date';
import { UserCreatedDomainEvent } from '@/users/v1/domain/user.created.domain.event';

export class User extends Entity {
  constructor(
    private id: UserId,
    private name: UserName,
    private email: UserEmail,
    private phone: UserPhone,
    private company: UserCompany,
    private date: UserDate
  ) {
    super();
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.company = company;
    this.date = date;
  }

  static create(
    id: UserId,
    name: UserName,
    email: UserEmail,
    phone: UserPhone,
    company: UserCompany,
    date: UserDate
  ): User {
    const user = new User(id, name, email, phone, company, date);

    user.record(
      new UserCreatedDomainEvent(
        id.valueOf(),
        name.valueOf(),
        email.valueOf(),
        phone.valueOf(),
        company.valueOf(),
        new Date()
      )
    );

    return user;
  }

  static fromPrimitives(
    id: string,
    name: string,
    email: string,
    phone: number,
    company: string,
    date: Date
  ): User {
    const userId = new UserId(id);
    const userName = new UserName(name);
    const userEmail = new UserEmail(email);
    const userPhone = new UserPhone(phone);
    const userCompany = new UserCompany(company);
    const userDate = new UserDate(date);
    return new User(
      userId,
      userName,
      userEmail,
      userPhone,
      userCompany,
      userDate
    );
  }

  toPrimitives() {
    throw new Error('Method not implemented.');
  }

  getId(): UserId {
    return this.id;
  }

  getName(): UserName {
    return this.name;
  }

  getEmail(): UserEmail {
    return this.email;
  }

  getPhone(): UserPhone {
    return this.phone;
  }

  getCompany(): UserCompany {
    return this.company;
  }

  getDate(): UserDate {
    return this.date;
  }
}
