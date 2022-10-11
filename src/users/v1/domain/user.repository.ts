import { User } from '@/users/v1/domain/user';
import { UserId } from '@/users/v1/domain/user.id';
// Ports (actions to do)
export interface UserRepository {
  save(user: User): Promise<void>;
  update(user: User): Promise<boolean>;
  delete(user: UserId): Promise<boolean>;
  findById(id: UserId): Promise<User | null>;
  findAll(): Promise<User[]>;
}
