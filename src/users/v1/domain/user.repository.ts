import { User } from '@/users/v1/domain/user';
// Ports (actions to do)
import { UserId } from '@/users/v1/domain/user.id';
import { UserName } from '@/users/v1/domain/user.name';
import { UserEmail } from '@/users/v1/domain/user.email';
import { UserPhone } from '@/users/v1/domain/user.phone';
import { UserCompany } from '@/users/v1/domain/user.company';
import { UserPassword } from '@/users/v1/domain/user.password';
export { UserId, UserPassword };
export type userTypes =
  | UserId
  | UserName
  | UserEmail
  | UserPhone
  | UserCompany
  | UserPassword;
export interface UserRepository {
  save(user: User): Promise<void>;
  update(user: User): Promise<boolean>;
  delete(user: UserId): Promise<boolean>;
  findById(id: UserId): Promise<User | null>;
  findBy(params: string, value: userTypes): Promise<User | null | undefined>;
  findAll(): Promise<User[]>;
  updatePassword(id: UserId, password: UserPassword): Promise<boolean>;
}
