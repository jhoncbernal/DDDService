//import { DomainError } from '@/shared/infrastructure/domain.error';
import { ValueObject } from '@/shared/infrastructure/value-objects/value.object';
//import { MomentDate } from '@/shared/infrastructure/date/date';

export class UserDate implements ValueObject<Date> {
  private momentDate: Date; //MomentDate;

  constructor(private value: Date) {
    this.momentDate = new Date(); //new MomentDate();
  }

  validate(value: Date): void {
    /*     if (this.momentDate.isValid(value)) {
      throw new DomainError(`User date is invalid.`);
    } */
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
