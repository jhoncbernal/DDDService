import { ValueObject } from '@/shared/infrastructure/value-objects/value.object';
import { DateTS } from '@/shared/domain/date/date';
import { DomainError } from '@/shared/domain/domain.error';

export class UserDate implements ValueObject<Date> {
  private dateTS: DateTS;

  constructor(private value: Date) {
    this.dateTS = new DateTS();
    this.validate(value);
  }

  validate(value: Date): void {
    if (!this.dateTS.isValid(value)) {
      throw new DomainError(`User date is invalid.`);
    }
  }

  fromPrimitive(value: Date): ValueObject<Date> {
    return new UserDate(value);
  }

  valueOf(): Date {
    return this.value;
  }

  equals(object: ValueObject<Date>): boolean {
    return this.valueOf() == object.valueOf();
  }
}
