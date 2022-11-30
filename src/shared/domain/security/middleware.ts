import { SecurityMiddleware } from '@/shared/infrastructure/security/middleware';
import { JsonWebToken } from '@/shared/domain/security/jwt';
import { Ctx } from '@/shared/infrastructure/security/ctx.type';
import { Context } from '@/shared/domain/framework/decorators';
enum Actions {
  POST = 'create',
  GET = 'read',
  PUT = 'update',
  PATCH = 'update',
  DEL = 'delete'
}
export class MiddlewareRouter implements SecurityMiddleware {
  private static jwt = new JsonWebToken();

  /**
   * Validation middleware for authentication in a router
   * @param ctx
   * @param next
   */
  async isAuth(ctx: Ctx, next: Function): Promise<void> {
    try {
      const resource: string = ctx.request.url.split('/')[3];
      const subResource: string = ctx.request.url.split('/')[4];
      const token: string = ctx.request.header.authorization;
      const action: string = ctx.request.method;

      if (token) {
        ctx.request.header.authorization = `Bearer ${token}`;

        const decoded: any = MiddlewareRouter.jwt.verify(token);
        if (!decoded?.error) {
          const resources: Array<string> = decoded.privilages.resources;
          const actions: Array<string> = decoded.privilages.actions;

          const validateResources = resources.find(
            (res) => res == resource || res == subResource
          );
          const validateActions = actions.find(
            (act) => act == Actions[action as keyof typeof Actions]
          );

          if (!validateResources || !validateActions) {
            ctx.status = 401;
          } else {
            ctx.req.user = decoded;
            await next();
          }
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
