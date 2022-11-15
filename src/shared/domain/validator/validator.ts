import validator from 'validator';

namespace validate {
  export function isEmail(email: string) {
    return validator.isEmail(email);
  }
  export function isPhone(phone: string): boolean {
    return validator.isMobilePhone(phone);
  }
  export function isDate(date: Date): boolean {
    return validator.isDate(date.toString());
  }
  export function isStrongPassword(password: string): boolean {
    return validator.isStrongPassword(password);
  }
  export function isLength(
    value: string,
    options: validator.IsLengthOptions
  ): boolean {
    return validator.isLength(value, options);
  }
  export function isEmpty(value: string): boolean {
    return validator.isEmpty(value);
  }
  export function isToken(token: string): boolean {
    return validator.isJWT(token);
  }
}
export default validate;
