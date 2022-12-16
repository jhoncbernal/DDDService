import { ValueObject } from '@/shared/domain/value-objects/value.object';

import validate from '@/shared/infrastructure/validator/validator';
import { UserInvalid } from '@/users/v1/domain/exceptions/invalid';
export class UserCountryCode implements ValueObject<string> {
  constructor(private value: string) {
    this.validate(value);
  }

  fromPrimitive(value: string): ValueObject<string> {
    return new UserCountryCode(value);
  }

  validate(value: string): void {
    if (value && !validate.isCountryCode(value)) {
      throw new UserInvalid('country');
    }
  }

  valueOf(): string {
    return this.value;
  }

  equals(object: ValueObject<string>): boolean {
    return this.valueOf() == object.valueOf();
  }
}
