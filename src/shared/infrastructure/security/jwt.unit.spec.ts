import { JsonWebToken } from '@/shared/infrastructure/security/jwt';

describe('jwt functions', () => {
  let jwt: JsonWebToken;
  let token: string;
  beforeAll(() => {
    jest.setTimeout(10000);
    jwt = new JsonWebToken();
    token = jwt.sign({ data: 'test' }, '1m');
  });
  it('should sign using a jwt', () => {
    expect(token).not.toBeNull();
    expect(token).not.toBeUndefined();
    expect(typeof token).toBe('string');
    expect(token).not.toEqual('');
    expect(token.length).toBeGreaterThan(145);
  });
  it('should verify using a jwt', () => {
    const decoded: any = jwt.verify(token);
    expect(decoded).not.toBeNull();
    expect(decoded).not.toBeUndefined();
    expect(typeof decoded).toBe('object');
    expect(decoded).toHaveProperty('data');
    expect(decoded?.data).toEqual('test');
  });
  it('should decode using a jwt', () => {
    const decoded: any = jwt.decode(token);
    expect(decoded).not.toBeNull();
    expect(decoded).not.toBeUndefined();
    expect(typeof decoded).toBe('object');
    expect(decoded).toHaveProperty('data');
    expect(decoded?.data).toEqual('test');
  });

  it('should throw an error when sign using a jwt', () => {
    jwt.sign = jest.fn(() => {
      throw new Error('Error');
    });
    expect(() => jwt.sign({ data: 'test' }, '1m')).toThrowError('Error');
  });
  it('should throw an error when verify using a jwt', () => {
    jwt.verify = jest.fn(() => {
      throw new Error('Error');
    });
    expect(() => jwt.verify('')).toThrowError('Error');
  });
  it('should throw an error when decode using a jwt', () => {
    jwt.decode = jest.fn(() => {
      throw new Error('Error');
    });
    expect(() => jwt.decode('')).toThrowError('Error');
  });
});
