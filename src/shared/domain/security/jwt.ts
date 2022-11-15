import jsonwebtoken from 'jsonwebtoken';
import { JWT } from '@/shared/infrastructure/config';
import { SecurityJwt } from '@/shared/infrastructure/security/jwt';

export type DecodeJwt = string | { [key: string]: string } | null;
export class JsonWebToken implements SecurityJwt {
  private readonly secretKey: string = JWT.secretKey;

  /**
   * Sign the information and return a token
   * @param data
   * @returns <string | any>
   */
  sign(data: object): string {
    try {
      return jsonwebtoken.sign(data, this.secretKey, {
        expiresIn: '24h'
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  /**
   * Verify the token
   * @param token
   * @returns <string | any>
   */
  verify(token: string): string | jsonwebtoken.JwtPayload {
    try {
      return jsonwebtoken.verify(token, this.secretKey);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  /**
   * Decode the token
   * @param token
   * @returns <string | jsonwebtoken.JwtPayload | null>
   */
  decode(token: string): DecodeJwt {
    try {
      return jsonwebtoken.decode(token);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
