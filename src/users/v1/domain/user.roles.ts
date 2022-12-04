import { ValueObject } from '@/shared/domain/value-objects/value.object';

export class UserRoles implements ValueObject<Array<Object>> {
  constructor(private value: Array<Object>) {}

  fromPrimitive(value: Array<Object>): ValueObject<Array<Object>> {
    return new UserRoles(value);
  }
  validate(value: Array<Object>): void {}

  valueOf(): Array<Object> {
    return this.value;
  }

  equals(object: ValueObject<Array<Object>>): boolean {
    return this.valueOf() == object.valueOf();
  }
}
