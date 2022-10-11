import { Query } from '@/shared/infrastructure/cqrs/query-bus/query';
import { Response } from '@/shared/infrastructure/cqrs/query-bus/response';

export interface QueryHandler<Q extends Query, R extends Response> {
  subscribedTo(): Query;
  handle(query: Q): Promise<R>;
}
