import { v4 as uuidv4, validate } from 'uuid';

import { UUIDInvalid } from '@/shared/domain/value-objects/uuid.invalid';
import { ValueObject } from '@/shared/domain/value-objects/value.object';

export class Identifier implements ValueObject<string> {
  constructor(private value: string) {
    this.validate(value);
    this.value = value;
  }

  static random(): Identifier {
    return new Identifier(uuidv4());
  }

  valueOf(): string {
    return this.value;
  }

  fromPrimitive(value: string): ValueObject<string> {
    return new Identifier(value);
  }

  validate(value: string): void {
    if (!validate(value)) {
      throw new UUIDInvalid(value);
    }
  }

  equals(object: ValueObject<string>): boolean {
    return this.valueOf() == object.valueOf();
  }
}
