import { AppContainer } from '@/shared/domain/d-injection/container';
import { UserDeleteController } from '@/users/v1/gateway/controllers/delete.controller';
import {
  path,
  request,
  responses,
  summary,
  tags,
  Context,
  middlewares
} from '@/shared/domain/framework/decorators';
import { MiddlewareRouter } from '@/shared/domain/security/middleware';

export class UserDeleteRouter {
  @request('DELETE', '/api/v1/users/{id}')
  @summary('Delete a user by id')
  @tags(['Users'])
  @middlewares([new MiddlewareRouter().error])
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
      ctx.status = 204;
      ctx.body = { result: 'Deleted' };
    } catch (error: any) {
      // Error response
      ctx.throw(error);
    }
  }
}
