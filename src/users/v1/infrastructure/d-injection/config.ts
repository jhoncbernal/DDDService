import { ContainerModule, interfaces } from 'inversify';
import { TYPES } from '@/users/v1/infrastructure/d-injection/types';
import { TYPES as TYPES_SHARED } from '@/shared/domain/d-injection/types';

import { QueryHandler } from '@/shared/infrastructure/cqrs/query-bus/query.handler';
import { Query } from '@/shared/infrastructure/cqrs/query-bus/query';
import { Response } from '@/shared/infrastructure/cqrs/query-bus/response';

import { DomainEvent } from '@/shared/domain/event-bus/domain.event';
import { DomainEventSubscriber } from '@/shared/infrastructure/event-bus/domain.event.subscriber';

import { CreateUserHandler } from '@/users/v1/application/create/handler';

import { MongoUserRepository } from '@/users/v1/domain/repository/mongo.repository';
import { UserRepository } from '@/users/v1/domain/user.repository';
import { UpdateStatisticsOnUserCreated } from '@/users/v1/gateway/events/update.count.on.created';
import { Command } from '@/shared/infrastructure/cqrs/command-bus/command';
import { CommandHandler } from '@/shared/infrastructure/cqrs/command-bus/command.handler';
import { FindUserHandler } from '@/users/v1/application/find/handler';
import { FindAllUsersHandler } from '@/users/v1/application/find-all/handler';
import { UpdateUserHandler } from '@/users/v1/application/update/handler';
import { DeleteUserHandler } from '../../application/delete/handler';
import { QueryBus } from '@/shared/infrastructure/cqrs/query-bus/query.bus';

//import { ICache } from '@/shared/domain/cache/cache';
//import { usersCache } from '@/users/v1/infrastructure/cache/users.cache';

export const UserContainerModule = new ContainerModule(
  (bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind<UserRepository>(TYPES.UserRepository).to(MongoUserRepository);
    //  unbind<QueryBus>(TYPES_SHARED.QueryBus); // FIXME: remove this line

    // Redis
    //bind<ICache>(TYPES.usersCache).to(usersCache);

    //event - subscribers;
    bind<DomainEventSubscriber<DomainEvent>>(
      TYPES_SHARED.DomainEventSubscriber
    ).to(UpdateStatisticsOnUserCreated);

    // query-handlers

    bind<QueryHandler<Query, Response>>(TYPES_SHARED.QueryBusHandler).to(
      FindAllUsersHandler
    );
    bind<QueryHandler<Query, Response>>(TYPES_SHARED.QueryBusHandler).to(
      FindUserHandler
    );

    // command-handlers
    bind<CommandHandler<Command>>(TYPES_SHARED.CommandBusHandler).to(
      CreateUserHandler
    );
    bind<CommandHandler<Command>>(TYPES_SHARED.CommandBusHandler).to(
      UpdateUserHandler
    );
    bind<CommandHandler<Command>>(TYPES_SHARED.CommandBusHandler).to(
      DeleteUserHandler
    );
  }
);
