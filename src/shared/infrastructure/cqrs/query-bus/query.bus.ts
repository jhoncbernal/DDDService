import { Query } from '@/shared/infrastructure/cqrs/query-bus/query';
import { Response } from '@/shared/infrastructure/cqrs/query-bus/response';

export interface QueryBus {
  ask<R extends Response>(query: Query): Promise<R>;
}
