import compare from '@/shared/domain/utils/compare';
import validate from '@/shared/domain/validator/validator';
import { ValueObject } from '@/shared/infrastructure/value-objects/value.object';
type ACTIONS = 'create' | 'read' | 'update' | 'delete';

export class UserAction implements ValueObject<Array<string>> {
  private ROLE_ACTIONS: {
    [key in string]: Array<ACTIONS>;
  } = {
    user: ['read', 'update', 'delete'],
    admin: ['create', 'read', 'update', 'delete'],
    guest: ['read'],
    superAdmin: ['create', 'read', 'update', 'delete'],
    custom: ['create', 'read', 'update', 'delete']
  };
  constructor(private value: string) {
    this.validate(this.ROLE_ACTIONS[value]);
  }

  fromPrimitive(value: string[]): ValueObject<string[]> {
    throw new Error('Method not implemented.');
  }

  validate(values: Array<string>): void {
    if (!validate.isArray(values)) {
      throw new Error('User Actions are invalid');
    }
  }

  valueOf(): Array<string> {
    return this.ROLE_ACTIONS[this.value];
  }

  equals(object: ValueObject<Array<string>>): boolean {
    return compare.array(object.valueOf(), this.valueOf());
  }
}
