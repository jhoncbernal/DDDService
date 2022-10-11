import { StartModule } from '@/shared/infrastructure/bootstrap/bootstrap';

import { AppContainer } from '@/shared/domain/d-injection/container';
import { UserContainerModule } from '@/users/v1/infrastructure/d-injection/config';

export class UserBootstrap implements StartModule {
  async init(): Promise<void> {
    try {
      // independency injection
      AppContainer.load(UserContainerModule);
    } catch (error) {
      console.error(
        `[${UserBootstrap.name}] error starting module --> ${error}`
      );
    }
  }
}
