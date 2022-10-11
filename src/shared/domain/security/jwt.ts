import jsonwebtoken from 'jsonwebtoken';
import { JWT } from '@/shared/infrastructure/config';
import { SecurityJwt } from '@/shared/infrastructure/security/jwt';

export class JsonWebToken implements SecurityJwt {
  private readonly secretKey: string = JWT.secretKey;

  /**
   * Sign the information and return a token
   * @param data
   * @returns <string | any>
   */
  async sign(data: object): Promise<string | object> {
    try {
      return await jsonwebtoken.sign(data, this.secretKey, {
        expiresIn: '24h'
      });
    } catch (error) {
      return { error };
    }
  }

  /**
   * Verify the token
   * @param token
   * @returns <string | any>
   */
  async verify(token: string): Promise<string | any> {
    try {
      return await jsonwebtoken.verify(token, this.secretKey);
    } catch (error) {
      return { error };
    }
  }
}
