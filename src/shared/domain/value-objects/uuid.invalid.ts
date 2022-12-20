import { DomainError } from '@/shared/infrastructure/domain.error';

export class UUIDInvalid extends DomainError {
  constructor(uuid: string) {
    super(`The UUID ${uuid} is invalid`);
  }
}
