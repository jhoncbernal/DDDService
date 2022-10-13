import { Container, interfaces } from 'inversify';

import {
  EventBus,
  EventBusType
} from '@/shared/infrastructure/event-bus/event.bus';

import { TYPES } from '@/shared/domain/d-injection/types';
import { Logger } from '@/shared/infrastructure/logger/logger';

import { CommandBus } from '@/shared/infrastructure/cqrs/command-bus/command.bus';
import { InMemoryCommandBus } from '@/shared/domain/cqrs/in-memory/in.memory.command.bus';
import { CommandHandler } from '@/shared/infrastructure/cqrs/command-bus/command.handler';
import { Command } from '@/shared/infrastructure/cqrs/command-bus/command';
import { QueryBus } from '@/shared/infrastructure/cqrs/query-bus/query.bus';
import { InMemoryQueryBus } from '@/shared/domain/cqrs/in-memory/in.memory.query.bus';
import { QueryHandler } from '@/shared/infrastructure/cqrs/query-bus/query.handler';
import { Query } from '@/shared/infrastructure/cqrs/query-bus/query';
import { Response } from '@/shared/infrastructure/cqrs/query-bus/response';

import { Framework } from '@/shared/domain/framework';
import { Logger as LoggerClass } from '@/shared/domain/logger/logger';

import { InMemoryEventBus } from '@/shared/domain/event-bus/in-memory/in.memory.event.bus';

import { MongooseConnection } from '@/shared/domain/database/database.connection';
import { DatabaseConnection } from '@/shared/infrastructure/database/database.connection';

import { modules } from '@/index';
import { Framework as IFramework } from '@/shared/infrastructure/framework/framework';
import { StartModule } from '@/shared/infrastructure/bootstrap/bootstrap';

export class AppDependencies {
  register(container: Container) {
    this.configLogger(container);
    this.configModule(container);
    this.configFramework(container);
    this.configDatabase(container);
    this.configEventBus(container);
    this.configCommandBus(container);
    this.configQueryBus(container);
  }

  private configLogger(container: Container) {
    container.bind<Logger>(TYPES.Logger).to(LoggerClass).inSingletonScope();
  }

  private configModule(container: Container) {
    for (const Module of modules) {
      container
        .bind<StartModule>(TYPES.StartModule)
        .to(Module)
        .inSingletonScope();
    }
  }
  private configDatabase(container: Container) {
    container
      .bind<DatabaseConnection>(TYPES.DatabaseConnection)
      .to(MongooseConnection)
      .inSingletonScope();
  }
  private configFramework(container: Container) {
    container
      .bind<IFramework>(TYPES.Framework)
      .to(Framework)
      .inSingletonScope();
  }

  private configEventBus(container: Container) {
    container
      .bind<EventBus>(TYPES.EventBus)
      .to(InMemoryEventBus)
      .inSingletonScope();
  }
  private configCommandBus(container: Container) {
    // command-bus
    container
      .bind<CommandBus>(TYPES.CommandBus)
      .to(InMemoryCommandBus)
      .inSingletonScope();
  }

  private configQueryBus(container: Container) {
    container
      .bind<QueryBus>(TYPES.QueryBus)
      .to(InMemoryQueryBus)
      .inSingletonScope();
  }
  /*  
  private configCommandBus(container: Container) {
    // command-bus
    container
      .bind<CommandBus>(TYPES.CommandBus)
      .toDynamicValue((context: interfaces.Context) => {
        const handlersDefinitions = context.container.getAll<
          CommandHandler<Command>
        >(TYPES.CommandBusHandler);
        return new InMemoryCommandBus(handlersDefinitions);
      });
  }

  private configQueryBus(container: Container) {
    container
      .bind<QueryBus>(TYPES.QueryBus)
      .toDynamicValue((context: interfaces.Context) => {
        const handlersDefinitions = context.container.getAll<
          QueryHandler<Query, Response>
        >(TYPES.QueryBusHandler);

        return new InMemoryQueryBus(handlersDefinitions);
      });
  }*/
}
