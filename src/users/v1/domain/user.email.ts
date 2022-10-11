import { ValueObject } from '@/shared/infrastructure/value-objects/value.object';

export class UserEmail implements ValueObject<string> {
  constructor(private value: string) {}

  fromPrimitive(value: string): ValueObject<string> {
    return new UserEmail(value);
  }

  validate(value: string): void {}

  valueOf(): string {
    return this.value;
  }

  equals(object: ValueObject<string>): boolean {
    return this.valueOf() == object.valueOf();
  }
}
