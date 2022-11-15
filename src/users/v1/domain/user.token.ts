import { DecodeJwt, JsonWebToken } from '@/shared/domain/security/jwt';
import validate from '@/shared/domain/validator/validator';
import { ValueObject } from '@/shared/infrastructure/value-objects/value.object';

export class UserToken implements ValueObject<string> {
  private jwt: JsonWebToken;
  private valueObj: {
    encoded: string;
    decode: string;
    empty: string;
  };
  constructor(private value: string) {
    this.validate(value);
    this.jwt = new JsonWebToken();
    this.valueObj = {
      decode: '',
      encoded: '',
      empty: ''
    };
    this.decode();
    this.sign();
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
    return this.value.includes('@')
      ? this.valueObj.encoded
      : this.valueObj.decode;
  }

  equals(object: ValueObject<string>): boolean {
    return this.valueOf() == object.valueOf();
  }

  clear(): void {
    this.value = this.valueObj.empty;
    this.valueObj.encoded = this.valueObj.empty;
    this.valueObj.decode = this.valueObj.empty;
  }

  private sign(): void {
    this.valueObj.encoded = this.value.includes('@')
      ? this.jwt.sign({ email: this.value })
      : this.value;
  }

  private decode(): void {
    if (this.value.includes('@')) {
      this.valueObj.decode = this.value;
    } else {
      const result: DecodeJwt = this.jwt.decode(this.value);
      if (result && typeof result !== 'string') {
        this.valueObj.decode = result?.email;
      }
    }
  }
}
