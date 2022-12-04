import { inject, injectable } from 'inversify';
import { DomainEvent } from '@/shared/infrastructure/event-bus/domain.event';
import { DomainEventSubscriber } from '@/shared/domain/event-bus/domain.event.subscriber';
import { EventBus } from '@/shared/domain/event-bus/event.bus';
import { Logger } from '@/shared/domain/logger/logger';
import { TYPES } from '@/shared/infrastructure/d-injection/types';

@injectable()
export class InMemoryEventBus implements EventBus {
  private subscribers: Map<string, Array<DomainEventSubscriber<DomainEvent>>>;

  constructor(@inject(TYPES.Logger) private readonly logger: Logger) {
    this.subscribers = new Map();
    this.logger = logger;
  }

  async start(): Promise<void> {
    this.logger.info(`[${InMemoryEventBus.name}] Bus started successfully`);
  }

  async publish(events: DomainEvent[]): Promise<void> {
    events.forEach(async (event) => {
      this.logger.info(
        `[${InMemoryEventBus.name}] Event to be published: ${event.eventName}`
      );
      const subscribers = this.subscribers.get(event.eventName);
      if (subscribers && subscribers.length > 0) {
        const subscribersNames = subscribers.map(
          (subscriber) => subscriber.constructor.name
        );
        this.logger.info(
          `[${InMemoryEventBus.name}] Message processed: ${event.eventName} by ${subscribersNames}`
        );
        const subscribersExecutions = subscribers.map((subscriber) =>
          subscriber.on(event)
        );
        await Promise.all(subscribersExecutions);
      }
    });
  }

  addSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent>>): void {
    subscribers.forEach((subscriber) => {
      subscriber.subscribedTo().forEach((event) => {
        const eventName = event.EVENT_NAME;
        if (this.subscribers.has(eventName)) {
          this.subscribers.get(eventName)!.push(subscriber);
        } else {
          this.subscribers.set(eventName, [subscriber]);
        }
      });
    });
  }
}
