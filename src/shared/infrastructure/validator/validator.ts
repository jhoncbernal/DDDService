import validator from 'validator';

namespace validate {
  export function isEmail(email: string) {
    return validator.isEmail(email);
  }
  export function isPhone(phone: string, country: any = 'any'): boolean {
    return validator.isMobilePhone(phone, country);
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
  export function isArray(value: any): boolean {
    return Array.isArray(value);
  }
  export function isCountryCode(value: string): boolean {
    let result = validator.isISO31661Alpha2(value);
    return result;
  }
  export function isCity(value: string): boolean {
    return validator.isAlpha(value);
  }
  export function isObject(value: any): boolean {
    return typeof value === 'object';
  }
  export function isString(value: any): boolean {
    return typeof value === 'string';
  }
  export function isNumber(value: any): boolean {
    return validator.isNumeric(value);
  }
  export function isBoolean(value: any): boolean {
    return validator.isBoolean(value);
  }
  export function isAction(value: any): boolean {
    return validator.isIn(value, ['create', 'read', 'update', 'delete']);
  }
  export function isRole(value: any): boolean {
    return validator.isIn(value, [
      'viewer',
      'user',
      'admin',
      'guest',
      'superAdmin'
    ]);
  }

  export function isResource(value: any): boolean {
    return validator.isIn(value, ['users', 'auth', 'permission']);
  }

  export function isStatus(value: any): boolean {
    return validator.isIn(value, ['active', 'inactive', 'pending']);
  }
}
export default validate;
