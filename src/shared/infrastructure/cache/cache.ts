export interface ICache {
  connect(): Promise<void>;
  get(key: string): Promise<string | undefined | null>;
  getAll(): Promise<any>;
  set(
    key: string,
    value: any,
    ttl?: number
  ): Promise<number | string | undefined | null>;
  delete(key: string): Promise<number | undefined>;
  deleteAll(): Promise<void>;
}
