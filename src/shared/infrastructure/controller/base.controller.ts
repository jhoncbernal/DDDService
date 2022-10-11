export interface IBaseController {}
export type Exception = {
  module: string;
  codeStatus: number;
  type: string;
  message: string;
};

export interface ExceptionDomain {
  type: string;
  message: string;
}
