import { injectable } from 'inversify';
import { DomainEventClass } from '@/shared/domain/event-bus/domain.event';
import { DomainEventSubscriber } from '@/shared/infrastructure/event-bus/domain.event.subscriber';
import { UserCreatedDomainEvent } from '@/users/v1/domain/user.created.domain.event';
import { TYPES } from '@/shared/domain/d-injection/types';

@injectable()
export class UpdateStatisticsOnUserCreated
  implements DomainEventSubscriber<UserCreatedDomainEvent>
{
  subscribedTo(): DomainEventClass[] {
    return [UserCreatedDomainEvent];
  }

  async on(domainEvent: UserCreatedDomainEvent): Promise<void> {
    console.info(
      `hi there, I'm listening user created domain event ${domainEvent.getName()}`
    );
  }
}
