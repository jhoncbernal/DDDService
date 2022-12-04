export interface DateTS {
  format(from: string): string;
  diff(from: string, to: string, type: any): number;
  current(): string;
  isValid(value: string): boolean;
}
