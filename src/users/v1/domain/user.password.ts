import Crypt from '@/shared/domain/security/crypt';
import validate from '@/shared/domain/validator/validator';
import { ValueObject } from '@/shared/infrastructure/value-objects/value.object';

export class UserPassword implements ValueObject<string> {
  constructor(private value: string) {
    this.validate(value);
  }

  fromPrimitive(value: string): ValueObject<string> {
    return new UserPassword(value);
  }

  validate(value: string): void {
    if (value && !validate.isStrongPassword(value)) {
      throw new Error('Password is not strong enough');
    }
  }

  valueOf(): string {
    return this.value;
  }

  equals(object: ValueObject<string>): boolean {
    return Crypt.compare(this.valueOf(), object.valueOf());
  }
}
