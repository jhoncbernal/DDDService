export interface SecurityJwt {
  sign(data: object): string | object;
  verify(token: string): string | any;
  decode(token: string): string | any;
}
