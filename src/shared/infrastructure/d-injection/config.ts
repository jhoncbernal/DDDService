import { Container } from 'inversify';

import { EventBus } from '@/shared/domain/event-bus/event.bus';

import { TYPES } from '@/shared/infrastructure/d-injection/types';
import { Logger } from '@/shared/domain/logger/logger';

import { CommandBus } from '@/shared/domain/cqrs/command-bus/command.bus';
import { InMemoryCommandBus } from '@/shared/infrastructure/cqrs/in-memory/in.memory.command.bus';
import { QueryBus } from '@/shared/domain/cqrs/query-bus/query.bus';
import { InMemoryQueryBus } from '@/shared/infrastructure/cqrs/in-memory/in.memory.query.bus';

import { Framework } from '@/shared/infrastructure/framework';
import { Logger as LoggerClass } from '@/shared/infrastructure/logger/logger';

import { InMemoryEventBus } from '@/shared/infrastructure/event-bus/in-memory/in.memory.event.bus';

import { MongooseConnection } from '@/shared/infrastructure/database/database.connection';
import { DatabaseConnection } from '@/shared/domain/database/database.connection';

import { modules } from '@/index';
import { Framework as IFramework } from '@/shared/domain/framework/framework';
import { StartModule } from '@/shared/domain/bootstrap/bootstrap';

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
}
