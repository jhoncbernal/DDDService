import { DomainError } from '@/shared/infrastructure/domain.error';

export class UserInvalid extends DomainError {
  constructor(param: string) {
    super(`Invalid user ${param}`);
  }
}
