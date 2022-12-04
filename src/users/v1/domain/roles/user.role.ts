import validate from '@/shared/infrastructure/validator/validator';
import { ValueObject } from '@/shared/domain/value-objects/value.object';
enum ROLES {
  admin,
  user,
  guest,
  superAdmin,
  custom
}

export class UserRole implements ValueObject<string> {
  constructor(private value: string) {
    this.validate(value);
  }
  fromPrimitive(value: string): ValueObject<string> {
    return new UserRole(value);
  }

  validate(value: string): void {
    if (validate.isEmpty(value) || !this.isRole(value)) {
      throw new Error('User Role is invalid');
    }
  }

  valueOf(): string {
    return this.value.toLowerCase();
  }

  equals(object: ValueObject<string>): boolean {
    return this.valueOf() == object.valueOf();
  }
  private isRole(value: string): boolean {
    return value in ROLES;
  }
}
