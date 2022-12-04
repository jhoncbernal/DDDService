import { DomainEvent } from '@/shared/infrastructure/event-bus/domain.event';
import { DomainEventSubscriber } from '@/shared/domain/event-bus/domain.event.subscriber';
import { EVENT_BUSES } from '@/shared/domain/config';

export interface EventBus {
  addSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent>>): void;
  start(): Promise<void>;
  publish(events: Array<DomainEvent>): Promise<void>;
}

export enum EventBusType {
  IN_MEMORY = EVENT_BUSES.buses.inMemory
}
