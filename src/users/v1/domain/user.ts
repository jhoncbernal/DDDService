import { Entity } from '@/shared/infrastructure/entity';

import { UserId } from '@/users/v1/domain/user.id';
import { UserName } from '@/users/v1/domain/user.name';
import { UserEmail } from '@/users/v1/domain/user.email';
import { UserPhone } from '@/users/v1/domain/user.phone';
import { UserCompany } from '@/users/v1/domain/user.company';
import { UserCreatedDomainEvent } from '@/users/v1/domain/user.created.domain.event';
import { UserPassword } from '@/users/v1/domain/user.password';
import { UserPrivilage } from '@/users/v1/domain/roles/privilages/user.privilage';
import { UserRole } from '@/users/v1/domain/roles/user.role';
import { UserCountryCode } from '@/users/v1/domain/user.country.code';
import { DomainError } from '@/shared/infrastructure/domain.error';

export class User extends Entity {
  constructor(
    private id: UserId,
    private name: UserName,
    private email: UserEmail,
    private phone: UserPhone,
    private company: UserCompany,
    private password: UserPassword,
    private country_code: UserCountryCode,
    private role?: UserRole,
    private privilage?: UserPrivilage
  ) {
    super();
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.company = company;
    this.password = password;
    this.country_code = country_code;
    this.role = role;
    this.privilage = privilage;
  }

  static create(
    id: UserId,
    name: UserName,
    email: UserEmail,
    phone: UserPhone,
    company: UserCompany,
    password: UserPassword,
    country_code: UserCountryCode,
    role: UserRole,
    privilage: UserPrivilage
  ): User {
    const user = new User(
      id,
      name,
      email,
      phone,
      company,
      password,
      country_code,
      role,
      privilage
    );

    user.record(
      new UserCreatedDomainEvent(
        id.valueOf(),
        name.valueOf(),
        email.valueOf(),
        phone.valueOf(),
        company.valueOf(),
        password.valueOf(),
        country_code.valueOf(),
        privilage.valueOf()
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
    password: string,
    countryCode: string,
    role: string
  ): User {
    const userId = new UserId(id);
    const userName = new UserName(name);
    const userEmail = new UserEmail(email);
    const userPhone = new UserPhone(phone);
    const userCompany = new UserCompany(company);
    const userPassword = new UserPassword(password);
    const userRole = new UserRole(role);
    const userPrivilage = new UserPrivilage(role);
    const userCountryCode = new UserCountryCode(countryCode);
    return new User(
      userId,
      userName,
      userEmail,
      userPhone,
      userCompany,
      userPassword,
      userCountryCode,
      userRole,
      userPrivilage
    );
  }

  toPrimitives() {
    throw new DomainError('Method not implemented.');
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

  getPassword(): UserPassword {
    return this.password;
  }
  getRole(): UserRole | undefined {
    return this.role;
  }
  getPrivilage(): UserPrivilage | undefined {
    return this.privilage;
  }
  getCountryCode(): UserCountryCode {
    return this.country_code;
  }
}
