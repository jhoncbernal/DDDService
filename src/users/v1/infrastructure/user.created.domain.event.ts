import { privilege } from '@/users/v1/domain/roles/privilages/user.privilage';

export type CreateUserDomainEventBody = {
  readonly eventName: string;
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly phone: number;
  readonly company: string;
  readonly password: string;
  readonly country_code: string;
  readonly privilage: privilege;
};
