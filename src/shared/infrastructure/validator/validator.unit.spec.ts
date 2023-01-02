//validator test
import validate from '@/shared/infrastructure/validator/validator';
describe('validate', () => {
  it('should be a valid email', () => {
    const email = 'test@gmail.com';
    expect(validate.isEmail(email)).toBe(true);
  });
  it('should be a valid phone', () => {
    const phone = '3101111111';
    expect(validate.isPhone(phone, 'es-CO')).toBe(true);
  });
  it('should be a valid password', () => {
    const password = 'String123!';
    expect(validate.isStrongPassword(password)).toBe(true);
  });
  it('should be a valid token', () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvcmdlM0BnbWFpbC5jb20iLCJkZXZpY2VJZCI6IjIxMjIzMjEzMTIiLCJ';
    expect(validate.isToken(token)).toBe(true);
  });
  it('should be a valid array', () => {
    const array = [1, 2, 3, 4, 5];
    expect(validate.isArray(array)).toBe(true);
  });
  it('should be a valid string', () => {
    const string = '';
    expect(validate.isEmpty(string)).toBe(true);
  });
  it('should be a valid length', () => {
    const string = 'test';
    expect(validate.isLength(string, { min: 3, max: 50 })).toBe(true);
  });
  it('should be a valid date', () => {
    const date = '2020-10-10';
    expect(validate.isDate(date)).toBe(true);
  });
  it('should be a valid country code', () => {
    const countryCode = 'CO';
    expect(validate.isCountryCode(countryCode)).toBe(true);
  });
  it('should be a valid city', () => {
    const city = 'Medellin';
    expect(validate.isCity(city)).toBe(true);
  });
  it('should be a valid object', () => {
    const object = {};
    expect(validate.isObject(object)).toBe(true);
  });
  it('should be a valid number', () => {
    const number = '123';
    expect(validate.isNumber(number)).toBe(true);
  });
  it('should be a valid boolean', () => {
    const boolean = 'true';
    expect(validate.isBoolean(boolean)).toBe(true);
  });
  it('should be a valid action', () => {
    const action = 'create';
    expect(validate.isAction(action)).toBe(true);
  });
  it('should be a valid role', () => {
    const role = 'admin';
    expect(validate.isRole(role)).toBe(true);
  });
  it('should be a valid resource', () => {
    const resource = 'users';
    expect(validate.isResource(resource)).toBe(true);
  });
  it('should be a valid status', () => {
    const status = 'active';
    expect(validate.isStatus(status)).toBe(true);
  });
});
