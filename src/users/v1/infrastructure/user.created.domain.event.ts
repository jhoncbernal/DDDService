import { privilege } from '../domain/roles/privilages/user.privilage';

export type CreateUserDomainEventBody = {
  readonly eventName: string;
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly phone: number;
  readonly company: string;
  readonly password: string;
  readonly privilage: privilege;
  readonly token: string;
};
