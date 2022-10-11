import { ValueObject } from '@/shared/infrastructure/value-objects/value.object';

export class UserPhone implements ValueObject<number> {
  constructor(private value: number) {}

  fromPrimitive(value: number): ValueObject<number> {
    return new UserPhone(value);
  }

  validate(value: number): void {}

  valueOf(): number {
    return this.value;
  }

  equals(object: ValueObject<number>): boolean {
    return this.valueOf() == object.valueOf();
  }
}
