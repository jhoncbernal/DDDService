import {
  request as koaRequest,
  summary as koaSumary,
  path as koaPath,
  tags as koaTags,
  responses as koaResponses,
  body as koaBody,
  middlewares as koaMiddlewares,
  Context as KoaContext,
  SwaggerRouter,
  query as koaQuery,
  queryAll as koaQueryAll
} from 'koa-swagger-decorator';
export function request(method: string, path: string) {
  return koaRequest(method, path);
}
export function summary(summary: string) {
  return koaSumary(summary);
}
export function path(path: any) {
  return koaPath(path);
}
export function tags(tags: string[]) {
  return koaTags(tags);
}
export function responses(responses: any) {
  return koaResponses(responses);
}
export function body(body: any) {
  return koaBody(body);
}
export function middlewares(middlewares: any) {
  return koaMiddlewares(middlewares);
}
export function query(query: any) {
  return koaQuery(query);
}
export function queryAll(query: any) {
  return koaQueryAll(query);
}
type UserInfo = {
  userInfo: {
    email: string;
    deviceId: string;
    privilages: {
      resources: string[];
      actions: string[];
    };
  };
};
export type Context = KoaContext & UserInfo;
export { SwaggerRouter };
