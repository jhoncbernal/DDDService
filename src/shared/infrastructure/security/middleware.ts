import { SecurityMiddleware } from '@/shared/domain/security/middleware';
import { JsonWebToken } from '@/shared/infrastructure/security/jwt';
import { Context } from '@/shared/infrastructure/framework/decorators';
enum Actions {
  POST = 'create',
  GET = 'read',
  PUT = 'update',
  PATCH = 'update',
  DELETE = 'delete',
  POST_ONE = 'createOne',
  GET_ONE = 'readOne',
  PUT_ONE = 'updateOne',
  PATCH_ONE = 'updateOne',
  DELETE_ONE = 'deleteOne'
}
export class MiddlewareRouter implements SecurityMiddleware {
  private static jwt = new JsonWebToken();

  /**
   * Validation middleware for authentication in a router
   * @param ctx
   * @param next
   */
  async isAuth(ctx: Context, next: Function): Promise<void> {
    try {
      // Get the params
      const resource: string = ctx.request.url.split('/')[3].split('?')[0];
      const subResource: string = ctx.request.url.split('/')[4];
      const token: string | undefined = ctx.request.header.authorization;
      const action: string = /\/:\w+$/.test(ctx.routerPath)
        ? `${ctx.request.method}_ONE`
        : ctx.request.method;
      // Get the UUIDS
      const regexUUID =
        /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g;
      const UUIDS = ctx.request.url.match(regexUUID);
      // validate if the token exists
      if (token) {
        ctx.request.header.authorization = `Bearer ${token}`;
        // validate if the token is valid
        const decoded: any = MiddlewareRouter.jwt.verify(token);
        if (!decoded?.error) {
          // check if the user has access to the resource
          const resources: Array<string> = decoded.permissions.map(
            (permission: { resource: string }) => permission.resource
          );
          const validateResources = resources.find(
            (res) => res == resource || res == subResource
          );
          //check if the user has access to the action in the resource
          let validateActions: string[] = [];
          decoded.permissions.forEach((permission: any) => {
            if (permission.resource === resource) {
              validateActions = permission.actions.filter((act: Actions) =>
                Actions[action as keyof typeof Actions].includes(act)
              );
            }
          });
          // user can onlu access to its own data
          if (
            validateActions[0]?.includes('One') &&
            !UUIDS?.includes(decoded.uuid)
          ) {
            ctx.status = 401;
          } else if (!validateResources || validateActions.length === 0) {
            // if the user does not have access to the resource or action
            ctx.status = 401;
          } else {
            ctx.userInfo = { ...decoded };
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
