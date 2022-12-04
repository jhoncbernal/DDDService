import { injectable } from 'inversify';
import { Logger as ILogger } from '@/shared/domain/logger/logger';
@injectable()
export class Logger implements ILogger {
  constructor() {
    this.debug = this.debug.bind(this);
    this.error = this.error.bind(this);
    this.info = this.info.bind(this);
    this.warn = this.warn.bind(this);
  }
  debug(...data: any[]): void {
    console.info(...data);
  }
  error(...data: any[]): void {
    console.error(...data);
  }
  info(...data: any[]): void {
    console.info(...data);
  }
  warn(...data: any[]): void {
    console.warn(...data);
  }
}
