import { DomainError } from '@/shared/infrastructure/domain.error';

export class UserDuplicated extends DomainError {
  constructor() {
    super(`User already exists`);
  }
}
