import { inject, injectable } from 'inversify';
import Koa from 'koa';
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import cookie from 'koa-cookie';
import morgan from 'koa-morgan';
import koaStatic from 'koa-static';
import { Swagger } from '@/shared/infrastructure/open-api/swagger.specification';
import { PROJECT, SERVER, SWAGGER } from '@/shared/domain/config';
import { Logger } from '@/shared/domain/logger/logger';
import { TYPES } from '@/shared/infrastructure/d-injection/types';
import { Framework } from '@/shared/domain/framework/framework';

@injectable()
export class KoaFramework implements Framework {
  private app: Koa;

  constructor(@inject(TYPES.Logger) private readonly logger: Logger) {
    this.app = new Koa();
  }

  async init(): Promise<void> {
    // Middleware
    this.app.use(cors());
    this.app.use(
      helmet({
        contentSecurityPolicy: false
      })
    );
    this.app.use(json());
    this.app.use(bodyParser());
    this.app.use(cookie());
    this.app.use(morgan('dev'));

    // Catching downstream errors
    this.app.on('error', (err: any, ctx: Koa.Context) => {
      this.logger.error(err);
      ctx.status = ctx.status || 500;
      ctx.body = { message: err.toString() };
    });

    // Swagger
    const appLayout = require('@/shared/domain/layouts/index.hbs');
    const swagger = new Swagger().router;
    swagger.get('/', (ctx: any) => {
      ctx.body = appLayout({
        name: PROJECT.name,
        mode: PROJECT.mode,
        docs: SWAGGER.isPublic === 'true' ? SWAGGER.html : false
      });
    });

    this.app.use(swagger.routes());
    this.app.use(swagger.allowedMethods());

    this.app.use(
      koaStatic(
        `${require('path').resolve()}/src/shared/infrastructure/layouts`
      )
    );

    const port = SERVER.port;

    this.app.listen(port, () =>
      this.logger.info(`[Koa] Started in ${SERVER.hostname}:${port}`)
    );
  }

  getApp(): Koa {
    return this.app;
  }
}
