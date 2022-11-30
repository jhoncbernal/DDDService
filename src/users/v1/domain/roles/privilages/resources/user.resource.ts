import compare from '@/shared/domain/utils/compare';
import validate from '@/shared/domain/validator/validator';
import { ValueObject } from '@/shared/infrastructure/value-objects/value.object';

type RESOURCES = 'user' | 'auth' | 'privilege';
export class UserResource implements ValueObject<Array<string>> {
  private ROLE_RESOURCES: {
    [key in string]: Array<RESOURCES>;
  } = {
    user: ['user'],
    admin: ['user', 'auth'],
    guest: ['user'],
    superAdmin: ['user', 'auth', 'privilege'],
    custom: ['user', 'auth', 'privilege']
  };
  constructor(private value: string) {
    this.validate(this.ROLE_RESOURCES[value]);
  }

  fromPrimitive(value: Array<string>): ValueObject<Array<string>> {
    throw new Error('Method not implemented.');
  }

  validate(values: Array<string>): void {
    if (!validate.isArray(values)) {
      throw new Error('User Resources are invalid');
    }
  }

  valueOf(): Array<string> {
    return this.ROLE_RESOURCES[this.value];
  }

  equals(object: ValueObject<Array<string>>): boolean {
    return compare.array(object.valueOf(), this.valueOf());
  }
}
