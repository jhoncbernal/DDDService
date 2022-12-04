export interface SecurityMiddleware {
  isAuth(context: Object, next: Function): Promise<void>;
}
