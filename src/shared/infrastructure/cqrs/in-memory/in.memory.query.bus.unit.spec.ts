import { InMemoryQueryBus } from '@/shared/infrastructure/cqrs/in-memory/in.memory.query.bus';
import { QueryHandler } from '@/shared/domain/cqrs/query-bus/query.handler';
import { Query } from '@/shared/domain/cqrs/query-bus/query';
import { Response } from '@/shared/domain/cqrs/query-bus/response';

class MockQuery implements Query {
  constructor(private test: string) {}
  getTest(): string {
    return this.test;
  }
}

class MockResponse implements Response {
  constructor(private test: string) {}
  getTest(): string {
    return this.test;
  }
}

class MockHandler implements QueryHandler<MockQuery, MockResponse> {
  subscribedTo = (): Query => MockQuery;
  handle(query: MockQuery): Promise<MockResponse> {
    return Promise.resolve(new MockResponse(query.getTest()));
  }
}

describe('InMemoryQueryBus methods', () => {
  const queryBus = new InMemoryQueryBus([new MockHandler()]);

  jest.spyOn(queryBus, 'ask');

  it('InMemoryQueryBus ask', async () => {
    const result = await queryBus.ask(new MockQuery('hi'));
    expect(queryBus.ask).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(MockResponse);
    expect(result).toEqual(expect.objectContaining({ test: 'hi' }));
  });
});
