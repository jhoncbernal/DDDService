export const TYPES = {
  Framework: Symbol.for('Framework'),

  CachePubSub: Symbol.for('CachePubSub'),

  DatabaseConnection: Symbol.for('DatabaseConnection'),

  EventBus: Symbol.for('EventBus'),
  DomainEventSubscriber: Symbol.for('DomainEventSubscriber'),

  CronjobEvent: Symbol.for('CronjobEvent'),
  CronjobSubscriber: Symbol.for('CronjobSubscriber'),

  CommandBus: Symbol.for('CommandBus'),
  CommandBusHandler: Symbol.for('CommandBusHandler'),

  QueryBus: Symbol.for('QueryBus'),
  QueryBusHandler: Symbol.for('QueryBusHandler'),

  Logger: Symbol.for('Logger'),

  Serializer: Symbol.for('Serializer'),

  StartModule: Symbol.for('StartModule')
};
