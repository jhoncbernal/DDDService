//Use this type only for auth tests with JWT
export type Ctx = {
  request: {
    header: {
      authorization: string;
    };
    url: string;
    method: string;
  };
  status: number;
  req: {
    user: object;
  };
};
