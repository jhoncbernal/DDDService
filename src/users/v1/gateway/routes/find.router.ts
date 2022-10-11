import { AppContainer } from '@/shared/domain/d-injection/container';
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
import { UserGetController } from '@/users/v1/gateway/controllers/find.controller';

export class UserGetRouter {
  @request('GET', '/api/v1/users/{id}')
  @summary('Get a user by id')
  @tags(['Users'])
  @middlewares([new MiddlewareRouter().error])
  @path({
    id: { type: 'string', required: true }
  })
  @responses({
    200: { description: 'Successful' },
    500: { description: 'Error' }
  })
  static async getUser(ctx: Context) {
    try {
      // Get Params
      const { id } = ctx.validatedParams;
      // Get Controller
      const controller = AppContainer.resolve(UserGetController);
      const res = await controller.getUser({ id });
      // Successful response
      ctx.body = res;
    } catch (error: any) {
      // Error response
      ctx.throw(error);
    }
  }

  @request('GET', '/api/v1/users')
  @summary('Get all the users')
  @tags(['Users'])
  @middlewares([new MiddlewareRouter().error])
  @responses({
    200: { description: 'Successful' },
    500: { description: 'Error' }
  })
  static async getAllUsers(ctx: Context) {
    try {
      // Get Controller
      //const { page, limit } = ctx.validatedParams;
      const controller = AppContainer.resolve(UserGetController);
      const res = await controller.getAllUsers({ page: 10, limit: 1 });
      // Successful response
      ctx.body = res;
    } catch (error: any) {
      // Error response
      ctx.throw(error);
    }
  }

  @request('GET', '/users/protected')
  @summary('Get all the users (auth required)')
  @tags(['Users'])
  @middlewares([new MiddlewareRouter().isAuth])
  @responses({
    200: { description: 'Successful' },
    500: { description: 'Error' }
  })
  static async getAllUsersProtected(ctx: Context) {
    try {
      // Get current user
      const { user }: any = ctx.req;
      // Get Controller
      const controller = AppContainer.resolve(UserGetController);
      const res = await controller.getAllUsers({ page: 10, limit: 1 });
      // Successful response
      ctx.body = res;
    } catch (error: any) {
      // Error response
      ctx.throw(error);
    }
  }
}
