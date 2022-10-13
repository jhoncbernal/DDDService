import { StartModule } from '@/shared/infrastructure/bootstrap/bootstrap';

import { AppContainer } from '@/shared/domain/d-injection/container';
import { UserContainerModule } from '@/users/v1/infrastructure/d-injection/config';
import { TYPES } from '@/shared/domain/d-injection/types';
import { inject, injectable } from 'inversify';
import { Logger } from '@/shared/infrastructure/logger/logger';

@injectable()
export class UserBootstrap implements StartModule {
  constructor(@inject(TYPES.Logger) private readonly logger: Logger) {}

  async init(): Promise<void> {
    try {
      // independency injection
      AppContainer.load(UserContainerModule);
    } catch (error) {
      this.logger.error(
        `[${UserBootstrap.name}] error starting module --> ${error}`
      );
    }
  }
}
