import { Entity } from '@/shared/infrastructure/entity';

import { UserId } from '@/users/v1/domain/user.id';
import { UserName } from '@/users/v1/domain/user.name';
import { UserEmail } from '@/users/v1/domain/user.email';
import { UserPhone } from '@/users/v1/domain/user.phone';
import { UserCompany } from '@/users/v1/domain/user.company';
import { UserCreatedDomainEvent } from '@/users/v1/domain/user.created.domain.event';
import { UserPassword } from '@/users/v1/domain/user.password';
import { UserToken } from '@/users/v1/domain/user.token';
import { UserPrivilage } from '@/users/v1/domain/roles/privilages/user.privilage';
import { UserRole } from './roles/user.role';

export class User extends Entity {
  constructor(
    private id: UserId,
    private name: UserName,
    private email: UserEmail,
    private phone: UserPhone,
    private company: UserCompany,
    private password: UserPassword,
    private role?: UserRole,
    private privilage?: UserPrivilage,
    private token?: UserToken
  ) {
    super();
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.company = company;
    this.password = password;
    this.role = role;
    this.privilage = privilage;
    this.token = token;
  }

  static create(
    id: UserId,
    name: UserName,
    email: UserEmail,
    phone: UserPhone,
    company: UserCompany,
    password: UserPassword,
    role: UserRole,
    privilage: UserPrivilage,
    token: UserToken
  ): User {
    const user = new User(
      id,
      name,
      email,
      phone,
      company,
      password,
      role,
      privilage,
      token
    );

    user.record(
      new UserCreatedDomainEvent(
        id.valueOf(),
        name.valueOf(),
        email.valueOf(),
        phone.valueOf(),
        company.valueOf(),
        password.valueOf(),
        privilage.valueOf(),
        token.valueOf()
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
    role: string,
    token: string
  ): User {
    const userId = new UserId(id);
    const userName = new UserName(name);
    const userEmail = new UserEmail(email);
    const userPhone = new UserPhone(phone);
    const userCompany = new UserCompany(company);
    const userPassword = new UserPassword(password);
    const userRole = new UserRole(role);
    const userPrivilage = new UserPrivilage(role);
    const userToken = new UserToken(token);
    return new User(
      userId,
      userName,
      userEmail,
      userPhone,
      userCompany,
      userPassword,
      userRole,
      userPrivilage,
      userToken
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

  getPassword(): UserPassword {
    return this.password;
  }
  getRole(): UserRole | undefined {
    return this.role;
  }
  getPrivilage(): UserPrivilage | undefined {
    return this.privilage;
  }

  getToken(): UserToken | undefined {
    return this.token;
  }
}
