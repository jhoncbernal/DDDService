import compare from '@/shared/infrastructure/utils/compare';
import validate from '@/shared/infrastructure/validator/validator';
import { ValueObject } from '@/shared/domain/value-objects/value.object';
import { UserInvalid } from '@/users/v1/domain/exceptions/invalid';
type ACTIONS = 'create' | 'read' | 'update' | 'delete';
type ArrayOrString = string | string[];
export class UserAction implements ValueObject<Array<ArrayOrString>> {
  private ROLE_ACTIONS: {
    [key in string]: Array<ACTIONS>;
  } = {
    user: ['read', 'update', 'delete'],
    admin: ['create', 'read', 'update', 'delete'],
    guest: ['read'],
    superAdmin: ['create', 'read', 'update', 'delete'],
    custom: ['create', 'read', 'update', 'delete']
  };
  constructor(private value: ArrayOrString) {
    if (typeof value === 'string') {
      this.validate(this.ROLE_ACTIONS[value]);
    } else {
      this.validate(value);
    }
  }

  fromPrimitive(value: string[]): ValueObject<string[]> {
    throw new Error('Method not implemented.');
  }

  validate(values: Array<string>): void {
    if (values && !validate.isArray(values)) {
      throw new UserInvalid('actions');
    }
  }

  valueOf(): Array<string> {
    if (typeof this.value === 'string') {
      return this.ROLE_ACTIONS[this.value];
    }
    return this.value;
  }

  equals(object: ValueObject<Array<string>>): boolean {
    return compare.array(object.valueOf(), this.valueOf());
  }
}
