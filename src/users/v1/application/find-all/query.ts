// CQRS query (from params)
import { Query } from '@/shared/infrastructure/cqrs/query-bus/query';

export class UserFindAllQuery implements Query {
  private page: number;
  private limit: number;

  constructor(page: number, limit: number) {
    this.page = page;
    this.limit = limit;
  }

  getPage(): number {
    return this.page;
  }

  getLimit(): number {
    return this.limit;
  }
}
