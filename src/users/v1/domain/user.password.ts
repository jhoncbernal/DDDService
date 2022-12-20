import Crypt from '@/shared/infrastructure/security/crypt';
import validate from '@/shared/infrastructure/validator/validator';
import { ValueObject } from '@/shared/domain/value-objects/value.object';
import { DomainError } from '@/shared/infrastructure/domain.error';

export class UserPassword implements ValueObject<string> {
  constructor(private value: string) {
    this.validate(value);
  }

  fromPrimitive(value: string): ValueObject<string> {
    return new UserPassword(value);
  }

  validate(value: string): void {
    if (value && !validate.isStrongPassword(value)) {
      throw new DomainError('Password is not strong enough');
    }
  }

  valueOf(cipher: boolean = false): string {
    if (!cipher) return this.value;
    return this.cipher();
  }

  equals(object: ValueObject<string>): boolean {
    return Crypt.compare(this.valueOf(), object.valueOf());
  }

  private cipher(): string {
    return Crypt.genHash(this.valueOf());
  }
}
