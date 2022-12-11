import { User } from '@/users/v1/domain/user';
// Ports (actions to do)
import { UserId } from '@/users/v1/domain/user.id';
import { UserName } from '@/users/v1/domain/user.name';
import { UserEmail } from '@/users/v1/domain/user.email';
import { UserPhone } from '@/users/v1/domain/user.phone';
import { UserCompany } from '@/users/v1/domain/user.company';
import { UserPassword } from '@/users/v1/domain/user.password';
import { UserToken } from '@/users/v1/domain/user.token';

export type userTypes =
  | UserId
  | UserName
  | UserEmail
  | UserPhone
  | UserCompany
  | UserPassword
  | UserToken;
export interface UserRepository {
  save(user: User): Promise<void>;
  update(user: User): Promise<boolean>;
  delete(user: UserId): Promise<boolean>;
  findById(id: UserId): Promise<User | null>;
  findBy(params: string, value: userTypes): Promise<User | null>;
  findAll(): Promise<User[]>;
  updatePassword(id: string, password: string): Promise<boolean>;
}
