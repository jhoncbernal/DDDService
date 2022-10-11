import { DomainError } from '@/shared/domain/domain.error';

export class UserNotFound extends DomainError {
  constructor(id: string) {
    super(`User ${id} is not found`);
  }
}
