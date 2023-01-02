// CQRS command (from params)
import { Command } from '@/shared/domain/cqrs/command-bus/command';
import { UpdatePasswordDto } from '@/users/v1/gateway/dto/update-password.dto';
type StringUndefined = string | string[] | undefined;
export class UserUpdatePasswordCommand implements Command {
  private updatePasswordDto: UpdatePasswordDto;

  constructor(updatePasswordDto: UpdatePasswordDto) {
    this.updatePasswordDto = updatePasswordDto;
  }

  getPassword(): string {
    return this.default(this.updatePasswordDto.password);
  }

  getNewPassword(): string {
    return this.default(this.updatePasswordDto.new_password);
  }

  getEmail(): string {
    return this.updatePasswordDto.user_info.email;
  }

  private default(value: StringUndefined): string {
    if (typeof value === 'string') return value;
    return '';
  }
}
