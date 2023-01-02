import validate from '@/shared/infrastructure/validator/validator';
import { ValueObject } from '@/shared/domain/value-objects/value.object';
import { UserInvalid } from '@/users/v1/domain/exceptions/invalid';

enum RESOURCE {
  users,
  auth,
  permission
}
export class UserResource implements ValueObject<string> {
  constructor(private value: string) {
    this.validate(value);
  }

  fromPrimitive(value: string): ValueObject<string> {
    return new UserResource(value);
  }

  validate(value: string): void {
    if (value && !this.isResource(value) && !validate.isEmpty(value)) {
      throw new UserInvalid('resource');
    }
  }

  valueOf(): string {
    return this.value;
  }

  equals(object: ValueObject<string>): boolean {
    return object.valueOf() === this.valueOf();
  }
  isResource(value: string): boolean {
    return value in RESOURCE;
  }
}
