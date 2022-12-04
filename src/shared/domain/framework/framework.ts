export interface Framework {
  init(): Promise<void>;
  getApp(): any;
}
