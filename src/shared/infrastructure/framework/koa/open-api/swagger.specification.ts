import { SwaggerRouter } from 'koa-swagger-decorator';
import { getRoutes } from '@/shared/infrastructure/bootstrap/import.system';
import { PROJECT, SWAGGER } from '@/shared/domain/config';
import { Swagger as ISwagger } from '@/shared/domain/open-api/swagger.specifications';
export class KoaSwagger implements ISwagger {
  public router: SwaggerRouter<any, {}>;
  constructor() {
    this.router = new SwaggerRouter();
    if (SWAGGER.isPublic === 'true') {
      this.router.swagger({
        title: PROJECT.name,
        description: `.ENV: ${PROJECT.mode}`.toUpperCase(),
        version: `${PROJECT.version}`,
        swaggerHtmlEndpoint: SWAGGER.html,
        swaggerJsonEndpoint: SWAGGER.json
      });
    }
    // Get routes
    getRoutes().map((x: object) => this.router.map(x, {}));
  }
}
