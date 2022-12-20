import { ValueObject } from '@/shared/domain/value-objects/value.object';
import validate from '@/shared/infrastructure/validator/validator';

export class UserCompany implements ValueObject<string> {
  constructor(private value: string) {
    this.validate(value);
  }

  fromPrimitive(value: string): ValueObject<string> {
    return new UserCompany(value);
  }

  validate(value: string): void {
    if (
      value &&
      (validate.isEmpty(value) ||
        !validate.isLength(value, { min: 3, max: 50 }))
    ) {
      throw new Error('User company is invalid');
    }
  }

  valueOf(): string {
    return this.value;
  }

  equals(object: ValueObject<string>): boolean {
    return this.valueOf() == object.valueOf();
  }
}
