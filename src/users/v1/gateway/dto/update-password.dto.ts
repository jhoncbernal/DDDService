export class UpdatePasswordDto {
  constructor(
    public readonly password: string,
    public readonly new_password: string,
    public readonly user_info: {
      email: string;
      deviceId: string;
      privilages: {
        resources: string[];
        actions: string[];
      };
    }
  ) {}

  static fromJSON(json: any): UpdatePasswordDto {
    return new UpdatePasswordDto(
      json.password,
      json.new_password,
      json?.user_info
    );
  }
  toJSON(): object {
    return {
      password: this.getPassword(),
      new_password: this.getNewPassword(),
      user_info: {
        email: this.getEmail(),
        deviceId: this.getDeviceId(),
        privilages: {
          resources: this.getResouces(),
          actions: this.getActions()
        }
      }
    };
  }
  getPassword(): string {
    return this.password;
  }
  getNewPassword(): string {
    return this.new_password;
  }
  getEmail(): string {
    return this.user_info.email;
  }
  getDeviceId(): string {
    return this.user_info.deviceId;
  }
  getResouces(): string[] {
    return this.user_info.privilages.resources;
  }
  getActions(): string[] {
    return this.user_info.privilages.actions;
  }
}
