import validate from '@/shared/domain/validator/validator';
import { ValueObject } from '@/shared/infrastructure/value-objects/value.object';

export class UserPhone implements ValueObject<number> {
  constructor(private value: number) {
    this.validate(value);
  }

  fromPrimitive(value: number): ValueObject<number> {
    return new UserPhone(value);
  }

  validate(value: number): void {
    if (value && !validate.isPhone(value.toString())) {
      throw new Error('User phone is invalid');
    }
  }

  valueOf(): number {
    return this.value;
  }

  equals(object: ValueObject<number>): boolean {
    return this.valueOf() == object.valueOf();
  }
}
