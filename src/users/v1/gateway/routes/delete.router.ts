import { AppContainer } from '@/shared/infrastructure/d-injection/container';
import { UserDeleteController } from '@/users/v1/gateway/controllers/delete.controller';
import {
  path,
  request,
  responses,
  summary,
  tags,
  Context,
  middlewares
} from '@/shared/infrastructure/framework/decorators';
import { MiddlewareRouter } from '@/shared/infrastructure/security/middleware';

export class UserDeleteRouter {
  @request('DELETE', '/api/v1/users/{id}')
  @summary('Delete a user by id')
  @tags(['Users'])
  @middlewares([new MiddlewareRouter().error, new MiddlewareRouter().isAuth])
  @path({
    id: { type: 'string', required: true }
  })
  @responses({ 204: { description: 'Deleted' }, 500: { description: 'Error' } })
  static async deleteUser(ctx: Context) {
    try {
      // Get Params
      const { id } = ctx.validatedParams;
      // Get Controller
      const controller = AppContainer.resolve(UserDeleteController);
      await controller.deleteUser({ id });
      // Successful response
      ctx.body = { result: 'Deleted' };
      //ctx.status = 204;
    } catch (error: any) {
      // Error response
      ctx.throw(error);
    }
  }
}
