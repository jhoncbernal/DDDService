import {
  request,
  responses,
  summary,
  tags,
  Context,
  body,
  middlewares
} from '@/shared/domain/framework/decorators';
import { AppContainer } from '@/shared/domain/d-injection/container';
import { UserPostController } from '@/users/v1/gateway/controllers/post.controller';
import { MiddlewareRouter } from '@/shared/domain/security/middleware';

export class UserPostRouter {
  @request('POST', '/api/v1/users')
  @summary('Create a user')
  @tags(['Users'])
  @middlewares([new MiddlewareRouter().error])
  @body({
    name: { type: 'string', required: true },
    email: { type: 'string', required: true },
    phone: { type: 'number', required: true },
    company: { type: 'string', required: true },
    date: { type: 'date', required: true }
  })
  @responses({ 201: { description: 'Created' }, 500: { description: 'Error' } })
  static async createUser(ctx: Context) {
    try {
      // Get Params
      const { id, name, email, phone, company, date } = ctx.validatedBody;
      // Get Controller
      const controller = AppContainer.resolve(UserPostController);
      const res = await controller.createUser({
        id,
        name,
        email,
        phone,
        company,
        date
      });
      // Successful response
      ctx.body = res;
      ctx.status = 201;
      ctx.body = { result: 'Created' };
    } catch (error: any) {
      // Error response
      ctx.throw(error);
    }
  }
}
