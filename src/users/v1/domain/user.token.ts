import { DecodeJwt, JsonWebToken } from '@/shared/infrastructure/security/jwt';
import validate from '@/shared/infrastructure/validator/validator';
import { ValueObject } from '@/shared/domain/value-objects/value.object';

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
    if (value && !validate.isToken(value) && !value.includes('@')) {
      throw new Error('User token is invalid');
    }
  }

  valueOf(): string {
    return this.value;
  }

  equals(object: ValueObject<string>): boolean {
    return this.valueOf() == object.valueOf();
  }

  sign(
    email: ValueObject<string>,
    deviceId: ValueObject<string>,
    expiresIn: string = '5m'
  ): string {
    return this.jwt.sign(
      { email: email.valueOf(), deviceId: deviceId.valueOf() },
      expiresIn
    );
  }

  decode(): DecodeJwt {
    return this.jwt.decode(this.value);
  }
  clear(): void {
    this.value = '';
  }
}
