export type CreateUserDomainEventBody = {
  readonly eventName: string;
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly phone: number;
  readonly company: string;
  readonly password: string;
  readonly token: string;
};
