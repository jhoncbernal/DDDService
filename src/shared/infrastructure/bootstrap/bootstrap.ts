import { inject, injectable } from 'inversify';
import { TYPES } from '@/shared/infrastructure/d-injection/types';
import { Logger } from '@/shared/domain/logger/logger';
import { StartModule } from '@/shared/domain/bootstrap/bootstrap';

import { EventBus } from '@/shared/domain/event-bus/event.bus';

import { Framework } from '@/shared/domain/framework/framework';
import { DomainEventSubscriber } from '@/shared/domain/event-bus/domain.event.subscriber';
import { DomainEvent } from '@/shared/infrastructure/event-bus/domain.event';

import { DatabaseConnection } from '@/shared/domain/database/database.connection';

import { AppContainer } from '@/shared/infrastructure/d-injection/container';
import { AppDependencies } from '@/shared/infrastructure/d-injection/config';
import { TEST } from '@/shared/domain/config';

@injectable()
export class SharedBootstrap implements StartModule {
  constructor(@inject(TYPES.Logger) private readonly logger: Logger) {}

  async init(): Promise<void> {
    try {
      if (!TEST.isDefined) {
        // database connection
        await this.startDatabase();
        // framework
        await this.startFramework();
        // event bus
        await this.startEventBus();
      } else {
        new AppDependencies().register(AppContainer);
      }
    } catch (error: any) {
      this.logger.error({
        type: 'BOOTSTRAP_ERROR',
        message: `[${SharedBootstrap.name}] Error ${error}`,
        module: 'SHARED',
        level: 'error'
      });
    }
  }

  private async startDatabase(): Promise<void> {
    const databaseConnection = AppContainer.get<DatabaseConnection>(
      TYPES.DatabaseConnection
    );
    await databaseConnection.connect();
  }

  private async startFramework(): Promise<void> {
    const framework = AppContainer.get<Framework>(TYPES.Framework);
    framework.init();
  }

  private async startEventBus(): Promise<void> {
    const eventBus = AppContainer.get<EventBus>(TYPES.EventBus);

    const subscriberDefinitions = AppContainer.getAll<
      DomainEventSubscriber<DomainEvent>
    >(TYPES.DomainEventSubscriber);

    eventBus.addSubscribers(subscriberDefinitions);
    eventBus.start();
  }
}
