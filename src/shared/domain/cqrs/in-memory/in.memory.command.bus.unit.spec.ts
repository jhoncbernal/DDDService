import { InMemoryCommandBus } from '@/shared/domain/cqrs/in-memory/in.memory.command.bus';
import { CommandHandler } from '@/shared/infrastructure/cqrs/command-bus/command.handler';
import { Command } from '@/shared/infrastructure/cqrs/command-bus/command';
import { Response } from '@/shared/infrastructure/cqrs/command-bus/response';

class MockCommand implements Command {
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

class MockHandler implements CommandHandler<MockCommand> {
  subscribedTo = (): Command => MockCommand;
  handle(command: MockCommand): Promise<any> {
    return Promise.resolve(new MockResponse(command.getTest()));
  }
}

describe('InMemoryCommandBus methods', () => {
  const commandBus = new InMemoryCommandBus([new MockHandler()]);

  jest.spyOn(commandBus, 'dispatch');
  jest.spyOn(commandBus, 'ask');

  it('InMemoryCommandBus dispatch', async () => {
    const result = await commandBus.dispatch(new MockCommand('hi'));
    expect(commandBus.dispatch).toHaveBeenCalledTimes(1);
    expect(result).toBeUndefined();
  });

  it('InMemoryCommandBus ask', async () => {
    const result = await commandBus.ask(new MockCommand('hi'));
    expect(commandBus.ask).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(MockResponse);
    expect(result).toEqual(expect.objectContaining({ test: 'hi' }));
  });
});
