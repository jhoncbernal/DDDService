import { Query } from '@/shared/infrastructure/cqrs/query-bus/query';
import { QueryNotRegistered } from '@/shared/infrastructure/cqrs/query-bus/query.not.registered';
import { QueryBus } from '@/shared/infrastructure/cqrs/query-bus/query.bus';
import { QueryHandler } from '@/shared/infrastructure/cqrs/query-bus/query.handler';
import { Response } from '@/shared/infrastructure/cqrs/query-bus/response';
import { TYPES } from '@/shared/domain/d-injection/types';
import { inject, injectable, multiInject } from 'inversify';
@injectable()
export class InMemoryQueryBus implements QueryBus {
  private queryHandlersMap: Map<Query, QueryHandler<Query, Response>>;

  constructor(
    @multiInject(TYPES.QueryBusHandler)
    queryHandlers: Array<QueryHandler<Query, Response>>
  ) {
    this.queryHandlersMap = this.formatHandlers(queryHandlers);
  }

  async ask<R extends Response>(query: Query): Promise<R> {
    const handler: any = this.search(query);
    return handler.handle(query) as Promise<R>;
  }

  private formatHandlers(
    queryHandlers: Array<QueryHandler<Query, Response>>
  ): Map<Query, QueryHandler<Query, Response>> {
    const handlersMap = new Map();

    queryHandlers.forEach((queryHandler) => {
      handlersMap.set(queryHandler.subscribedTo(), queryHandler);
    });

    return handlersMap;
  }

  private search(query: Query): QueryHandler<Query, Response> {
    const queryHandler = this.queryHandlersMap.get(query.constructor);

    if (!queryHandler) {
      throw new QueryNotRegistered(query);
    }

    return queryHandler;
  }
}
