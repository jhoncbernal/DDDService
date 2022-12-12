import validate from '@/shared/infrastructure/validator/validator';
import { ValueObject } from '@/shared/domain/value-objects/value.object';
import { UserInvalid } from '@/users/v1/domain/exceptions/invalid';

export class UserEmail implements ValueObject<string> {
  constructor(private value: string) {
    this.validate(value);
  }

  fromPrimitive(value: string): ValueObject<string> {
    return new UserEmail(value);
  }

  validate(value: string): void {
    if (value && !validate.isEmail(value)) {
      throw new UserInvalid('email');
    }
  }

  valueOf(): string {
    return this.value;
  }

  equals(object: ValueObject<string>): boolean {
    return this.valueOf() == object.valueOf();
  }
}
