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
  @request('POST', '/api/v1/users/auth/signup')
  @summary('Sing up')
  @tags(['Users'])
  @middlewares([new MiddlewareRouter().error, new MiddlewareRouter().isAuth])
  @body({
    name: { type: 'string', required: true },
    email: { type: 'string', required: true },
    phone: { type: 'number', required: true },
    company: { type: 'string', required: true },
    password: { type: 'string', required: true }
  })
  @responses({ 201: { description: 'Created' }, 500: { description: 'Error' } })
  static async createUser(ctx: Context) {
    try {
      // Get Params
      const { name, email, phone, company, password, token } =
        ctx.validatedBody;
      // Get Controller
      const controller = AppContainer.resolve(UserPostController);
      const res = await controller.createUser({
        name,
        email,
        phone,
        company,
        password,
        token
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

  @request('POST', '/api/v1/users/auth/signin')
  @summary('Sign in')
  @tags(['Users'])
  @middlewares([new MiddlewareRouter().error])
  @body({
    email: { type: 'string', required: true },
    password: { type: 'string', required: true }
  })
  @responses({ 201: { description: '' }, 500: { description: 'Error' } })
  static async login(ctx: Context) {
    try {
      // Get Params
      const { email, password } = ctx.validatedBody;
      // Get Controller
      const controller = AppContainer.resolve(UserPostController);
      const res = await controller.login({
        email,
        password
      });
      // Successful response
      ctx.body = res;
    } catch (error: any) {
      // Error response
      ctx.throw(error);
    }
  }
}
