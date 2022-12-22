import compare from '@/shared/infrastructure/utils/compare';
import validate from '@/shared/infrastructure/validator/validator';
import { ValueObject } from '@/shared/domain/value-objects/value.object';
import { UserInvalid } from '@/users/v1/domain/exceptions/invalid';

type RESOURCES = 'users' | 'auth' | 'privilege';
type ArrayOrString = string | string[];
export class UserResource implements ValueObject<Array<ArrayOrString>> {
  private ROLE_RESOURCES: {
    [key in string]: Array<RESOURCES>;
  } = {
    user: ['users'],
    admin: ['users', 'auth'],
    guest: ['users'],
    superAdmin: ['users', 'auth', 'privilege'],
    custom: ['users', 'auth', 'privilege']
  };
  constructor(private value: ArrayOrString) {
    if (typeof value === 'string') {
      this.validate(this.ROLE_RESOURCES[value]);
    } else {
      this.validate(value);
    }
  }

  fromPrimitive(value: Array<string>): ValueObject<Array<string>> {
    throw new Error('Method not implemented.');
  }

  validate(values: Array<string>): void {
    if (values && !validate.isArray(values)) {
      throw new UserInvalid('resources');
    }
  }

  valueOf(): Array<string> {
    if (typeof this.value === 'string') {
      return this.ROLE_RESOURCES[this.value];
    }
    return this.value;
  }

  equals(object: ValueObject<Array<string>>): boolean {
    return compare.array(object.valueOf(), this.valueOf());
  }
}
