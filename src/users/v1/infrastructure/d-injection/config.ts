import { ContainerModule, interfaces } from 'inversify';
import { TYPES } from '@/users/v1/infrastructure/d-injection/types';
import { TYPES as TYPES_SHARED } from '@/shared/infrastructure/d-injection/types';

import { QueryHandler } from '@/shared/domain/cqrs/query-bus/query.handler';
import { Query } from '@/shared/domain/cqrs/query-bus/query';
import { Response } from '@/shared/domain/cqrs/query-bus/response';

import { DomainEvent } from '@/shared/infrastructure/event-bus/domain.event';
import { DomainEventSubscriber } from '@/shared/domain/event-bus/domain.event.subscriber';

import { CreateUserHandler } from '@/users/v1/application/auth/sing-up/handler';

import { MongoUserRepository } from '@/users/v1/domain/repository/mongo.repository';
import { UserRepository } from '@/users/v1/domain/user.repository';
import { UpdateStatisticsOnUserCreated } from '@/users/v1/gateway/events/update.count.on.created';
import { Command } from '@/shared/domain/cqrs/command-bus/command';
import { CommandHandler } from '@/shared/domain/cqrs/command-bus/command.handler';
import { FindUserHandler } from '@/users/v1/application/find/handler';
import { FindAllUsersHandler } from '@/users/v1/application/find-all/handler';
import { UpdateUserHandler } from '@/users/v1/application/update/handler';
import { DeleteUserHandler } from '@/users/v1/application/delete/handler';
import { UpdateUserPasswordHandler } from '@/users/v1/application/auth/update-password/handler';
import { LoginUserHandler } from '@/users/v1/application/auth/sing-in/handler';

//import { ICache } from '@/shared/domain/cache/cache';
//import { usersCache } from '@/users/v1/infrastructure/cache/users.cache';

export const UserContainerModule = new ContainerModule(
  (bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind<UserRepository>(TYPES.UserRepository).to(MongoUserRepository);
    //unbind<QueryBus>(TYPES_SHARED.QueryBus); // FIXME: remove this line

    // Redis
    //bind<ICache>(TYPES.usersCache).to(usersCache);

    //event - subscribers;
    bind<DomainEventSubscriber<DomainEvent>>(TYPES_SHARED.DomainEventSubscriber)
      .to(UpdateStatisticsOnUserCreated)
      .inSingletonScope();

    // query-handlers
    bind<QueryHandler<Query, Response>>(TYPES_SHARED.QueryBusHandler).to(
      FindAllUsersHandler
    );

    bind<QueryHandler<Query, Response>>(TYPES_SHARED.QueryBusHandler).to(
      FindUserHandler
    );

    // command-handlers
    bind<CommandHandler<Command>>(TYPES_SHARED.CommandBusHandler)
      .to(CreateUserHandler)
      .inSingletonScope();

    bind<QueryHandler<Query, Response>>(TYPES_SHARED.QueryBusHandler)
      .to(LoginUserHandler)
      .inSingletonScope();

    bind<CommandHandler<Command>>(TYPES_SHARED.CommandBusHandler)
      .to(UpdateUserHandler)
      .inSingletonScope();

    bind<CommandHandler<Command>>(TYPES_SHARED.CommandBusHandler)
      .to(UpdateUserPasswordHandler)
      .inSingletonScope();

    bind<CommandHandler<Command>>(TYPES_SHARED.CommandBusHandler)
      .to(DeleteUserHandler)
      .inSingletonScope();
  }
);
