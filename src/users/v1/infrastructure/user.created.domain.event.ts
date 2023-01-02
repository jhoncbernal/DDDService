import { permissions } from '@/users/v1/domain/permissions/user.permission';

export type CreateUserDomainEventBody = {
  readonly eventName: string;
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly phone: number;
  readonly company: string;
  readonly password: string;
  readonly country_code: string;
  readonly permission: permissions;
};
