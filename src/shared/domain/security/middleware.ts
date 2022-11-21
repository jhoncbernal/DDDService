import { SecurityMiddleware } from '@/shared/infrastructure/security/middleware';
import { JsonWebToken } from '@/shared/domain/security/jwt';
import { Ctx } from '@/shared/infrastructure/security/ctx.type';
import { Context } from '@/shared/domain/framework/decorators';

export class MiddlewareRouter implements SecurityMiddleware {
  private static jwt = new JsonWebToken();

  /**
   * Validation middleware for authentication in a router
   * @param ctx
   * @param next
   */
  async isAuth(ctx: Ctx, next: Function): Promise<void> {
    try {
      const token: string = ctx.request.header.authorization;
      if (token) {
        ctx.request.header.authorization = `Bearer ${token}`;
        const decoded: any = MiddlewareRouter.jwt.verify(token);
        if (!decoded?.error) {
          ctx.req.user = decoded;
          await next();
        }
      } else {
        ctx.status = 401;
      }
    } catch (error: any) {
      if (error?.message?.includes('jwt expired')) {
        ctx.status = 401;
      } else if (error?.message.includes('jwt malformed')) {
        ctx.status = 403;
      } else if (error?.message.includes('invalid signature')) {
        ctx.status = 403;
      }
    }
  }

  async error(ctx: Context, next: Function, err: any): Promise<void> {
    try {
      await next();
    } catch (err: any) {
      // will only respond with JSON
      ctx.status = err.codeStatus || err.status || 500;
      ctx.body = {
        message: err.message || 'Internal Server Error',
        ...err
      };
    }
  }
}
