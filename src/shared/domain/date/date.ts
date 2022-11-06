import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone';
import isBetween from 'dayjs/plugin/isBetween';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DateTS as IDateTS } from '@/shared/infrastructure/date/date';

dayjs.extend(utc);
dayjs.extend(tz);
dayjs.extend(isBetween);
dayjs.extend(customParseFormat);

export class DateTS implements IDateTS {
  diff(from: string, to: string, type: any): number {
    return dayjs(from).diff(to, type);
  }
  format(from: string): string {
    return dayjs().format(from);
  }

  current(timezone?: string): string {
    if (timezone) {
      const formatedDate = dayjs().tz(timezone).format();
      return formatedDate;
    }
    return dayjs().format();
  }

  setTime(hour: string, min: string, timezone: string): string {
    return dayjs()
      .tz(timezone)
      .hour(+hour)
      .minute(+min)
      .format();
  }

  weekDayName(timezone?: string): string {
    return timezone
      ? dayjs().tz(timezone).format('dddd')
      : dayjs().format('dddd');
  }

  timezone(value: any, timezone: string): Date {
    return dayjs(value).tz(timezone).toDate();
  }

  isBetween(value: string, fromDate: string, toDate: string): boolean {
    return dayjs(value).isBetween(fromDate, toDate);
  }

  isValid(value: string | Date, form: any = false): boolean {
    return !form
      ? dayjs(value.toString()).isValid()
      : dayjs(value.toString(), form, true).isValid();
  }

  static getTimestamp(date: Date = new Date()): string {
    return new Date(date).toISOString();
  }
  static getDate(): Date {
    return new Date();
  }
}
