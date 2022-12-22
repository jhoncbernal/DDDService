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
import { UserDto } from '@/users/v1/gateway/dto/user.dto';
import { UpdatePasswordDto } from '@/users/v1/gateway/dto/update-password.dto';

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
      const { name, email, phone, company, country_code } = ctx.validatedBody;
      // Get Controller
      const controller = AppContainer.resolve(UserPutController);
      const user = UserDto.fromJSON({
        name,
        email,
        phone,
        company,
        country_code
      });
      await controller.updateUser(id, user);
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
      required: false
    },
    new_password: {
      type: 'string',
      required: true
    }
  })
  @header({
    authorization: {
      type: 'string',
      required: true
    }
  })
  @responses({ 200: { description: 'Updated' }, 500: { description: 'Error' } })
  static async updateUserPassword(ctx: Context) {
    try {
      // Get Token
      const { authorization } = ctx.request.header;
      // Get Params
      const { password, new_password } = ctx.validatedBody;
      // Get Controller
      const controller = AppContainer.resolve(UserPutController);
      await controller.updateUserPassword(
        UpdatePasswordDto.fromJSON({ password, new_password, authorization })
      );
      // Successful response
      ctx.body = { result: 'Password Updated' };
    } catch (error: any) {
      // Error response
      ctx.throw(error);
    }
  }
}
