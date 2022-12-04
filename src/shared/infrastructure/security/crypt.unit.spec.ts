import Crypt from '@/shared/infrastructure/security/crypt';

describe('Validate Class Unit Test', () => {
  let crypt = Crypt;

  it('should be defined', () => {
    expect(crypt).toBeDefined();
  });

  it('should return ', () => {
    const myPlaintextPassword = 'String123!';
    const someOtherPlaintextPassword = 'not_bacon';
    const hash = crypt.genHash(myPlaintextPassword);
    console.info(hash);
    expect(crypt.compare(myPlaintextPassword, hash)).toBe(true);
    expect(crypt.compare(someOtherPlaintextPassword, hash)).toBe(false);
  });
});
