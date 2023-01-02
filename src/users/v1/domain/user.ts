import { Entity } from '@/shared/infrastructure/entity';

import { UserId } from '@/users/v1/domain/user.id';
import { UserName } from '@/users/v1/domain/user.name';
import { UserEmail } from '@/users/v1/domain/user.email';
import { UserPhone } from '@/users/v1/domain/user.phone';
import { UserCompany } from '@/users/v1/domain/user.company';
import { UserCreatedDomainEvent } from '@/users/v1/domain/user.created.domain.event';
import { UserPassword } from '@/users/v1/domain/user.password';
import { UserPermissions } from '@/users/v1/domain/permissions/user.permission';
import { UserRole } from '@/users/v1/domain/user.role';
import { UserCountryCode } from '@/users/v1/domain/user.country.code';

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
    private permissions?: UserPermissions
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
    this.permissions = permissions;
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
    permissions: UserPermissions
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
      permissions
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
        permissions.valueOf()
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
    role: string,
    permissions: { resource: string; actions: string[] }[]
  ): User {
    const userId = new UserId(id);
    const userName = new UserName(name);
    const userEmail = new UserEmail(email);
    const userPhone = new UserPhone(phone);
    const userCompany = new UserCompany(company);
    const userPassword = new UserPassword(password);
    const userRole = new UserRole(role);
    const userPermissions = new UserPermissions(permissions);
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
      userPermissions
    );
  }

  toPrimitives(cifer: boolean = false) {
    return {
      uuid: this.id.valueOf(),
      name: this.name.valueOf(),
      email: this.email.valueOf(),
      phone: this.phone.valueOf(),
      company: this.company.valueOf(),
      password: this.password.valueOf(cifer),
      country_code: this.country_code.valueOf(),
      role: this.role?.valueOf(),
      permissions: this.permissions?.valueOf()
    };
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
  getPermissions(): UserPermissions | undefined {
    return this.permissions;
  }
  getCountryCode(): UserCountryCode {
    return this.country_code;
  }
}
