import { JsonWebToken } from '@/shared/domain/security/jwt';
import validate from '@/shared/domain/validator/validator';
import { ValueObject } from '@/shared/infrastructure/value-objects/value.object';

export class UserToken implements ValueObject<string> {
  private jwt: JsonWebToken;
  constructor(private value: string) {
    this.validate(value);
    this.jwt = new JsonWebToken();
  }

  fromPrimitive(value: string): ValueObject<string> {
    return new UserToken(value);
  }

  validate(value: string): void {
    if (value && !validate.isToken(value)) {
      throw new Error('User token is invalid');
    }
  }

  valueOf(field?: string): string {
    return field ? this.jwt.decode(this.value)[field] : this.value;
  }

  equals(object: ValueObject<string>): boolean {
    return this.valueOf() == object.valueOf();
  }
  clear(): void {
    this.value = '';
  }
}
