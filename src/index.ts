import 'reflect-metadata';
import { buildProviderModule } from 'inversify-binding-decorators';
import { TYPES } from '@/shared/infrastructure/d-injection/types';
import { AppContainer } from '@/shared/infrastructure/d-injection/container';
import { AppDependencies } from '@/shared/infrastructure/d-injection/config';
import { StartModule } from '@/shared/domain/bootstrap/bootstrap';
import { TEST } from '@/shared/domain/config';

// Modules
import { SharedBootstrap } from '@/shared/infrastructure/bootstrap/bootstrap';
import { UserBootstrap } from '@/users/v1/infrastructure/bootstrap';

export const modules = [SharedBootstrap, UserBootstrap];

if (!TEST.isDefined) {
  // Register dependencies
  new AppDependencies().register(AppContainer);
  // Initialize modules
  for (const Bootstrap of AppContainer.getAll<StartModule>(TYPES.StartModule)) {
    Bootstrap.init();
  }
}

AppContainer.load(buildProviderModule());
