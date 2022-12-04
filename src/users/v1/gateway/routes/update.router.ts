import {
  request,
  summary,
  path,
  body,
  tags,
  Context,
  responses,
  middlewares
} from '@/shared/infrastructure/framework/decorators';
import { AppContainer } from '@/shared/infrastructure/d-injection/container';
import { UserPutController } from '@/users/v1/gateway/controllers/update.controller';
import { MiddlewareRouter } from '@/shared/infrastructure/security/middleware';
import { header } from 'koa-swagger-decorator';

export class UserPutRouter {
  @request('PUT', '/api/v1/users/{id}')
  @summary('Update a user by id')
  @tags(['Users'])
  @middlewares([new MiddlewareRouter().error, new MiddlewareRouter().isAuth])
  @path({
    id: { type: 'string', required: true }
  })
  @body({
    name: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    phone: {
      type: 'number'
    },
    company: {
      type: 'string'
    }
  })
  @responses({ 200: { description: 'Updated' }, 500: { description: 'Error' } })
  static async updateUser(ctx: Context) {
    try {
      // Get Params
      const { id } = ctx.validatedParams;
      const { name, email, phone, company } = ctx.validatedBody;
      // Get Controller
      const controller = AppContainer.resolve(UserPutController);
      await controller.updateUser({
        id,
        name,
        email,
        phone,
        company
      });
      // Successful response
      ctx.body = { result: 'Updated' };
    } catch (error: any) {
      // Error response
      ctx.throw(error);
    }
  }

  @request('PUT', '/api/v1/users/auth/recover')
  @summary('Update password by user id')
  @tags(['Users'])
  @middlewares([new MiddlewareRouter().error])
  @body({
    password: {
      type: 'string',
      required: true
    }
  })
  @header({
    recover_token: {
      type: 'string',
      required: true
    }
  })
  @responses({ 200: { description: 'Updated' }, 500: { description: 'Error' } })
  static async updateUserPassword(ctx: Context) {
    try {
      // Get Token
      const { recover_token } = ctx.request.header;
      // Get Params
      const { password } = ctx.validatedBody;
      // Get Controller
      const controller = AppContainer.resolve(UserPutController);
      await controller.updateUserPassword({ recover_token, password });
      // Successful response
      ctx.body = { result: 'Password Updated' };
    } catch (error: any) {
      // Error response
      ctx.throw(error);
    }
  }
}
