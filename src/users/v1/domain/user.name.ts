import validate from '@/shared/infrastructure/validator/validator';
import { ValueObject } from '@/shared/domain/value-objects/value.object';

export class UserName implements ValueObject<string> {
  constructor(private value: string) {}

  fromPrimitive(value: string): ValueObject<string> {
    return new UserName(value);
  }

  validate(value: string): void {
    if (
      !validate.isEmpty(value) ||
      !validate.isLength(value, { min: 3, max: 50 })
    ) {
      throw new Error('User name must be between 3 and 50 characters long');
    }
  }

  valueOf(): string {
    return this.value;
  }

  equals(object: ValueObject<string>): boolean {
    return this.valueOf() == object.valueOf();
  }
}
