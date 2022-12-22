import { injectable } from 'inversify';
import {
  UserRepository,
  userTypes,
  UserId,
  UserPassword
} from '@/users/v1/domain/user.repository';
import { User } from '@/users/v1/domain/user';
import { privilege } from '@/users/v1/domain/roles/privilages/user.privilage';
import ObjectUtils from '@/shared/infrastructure/utils/object';

type UserMock = {
  uuid: string;
  name: string;
  email: string;
  phone: number;
  company: string;
  password: string;
  country_code: string;
  roles: {
    role: string | undefined;
    privileges: privilege | undefined;
  }[];
};
@injectable()
export class MockUserRepository implements UserRepository {
  constructor(private mockUsers: UserMock[]) {}
  async save(user: User): Promise<void> {
    this.mockUsers.push(this.userToMock(user, true));
  }
  async findBy(params: string, value: userTypes): Promise<User | undefined> {
    const user = this.mockUsers.find(
      (user: any) => user[params] === value.valueOf()
    );
    if (user) return this.fromPrimitives(user);
  }
  async updatePassword(id: UserId, password: UserPassword): Promise<boolean> {
    let result = false;
    this.mockUsers.forEach((user: UserMock) => {
      if (user.uuid === id.valueOf()) {
        user.password = password.valueOf(true);
        result = true;
      }
    });
    return result;
  }
  async update(user: User): Promise<boolean> {
    const result = true;
    this.mockUsers = this.mockUsers.map((userMock: UserMock) => {
      if (userMock.uuid === user.getId().valueOf()) {
        const updateUser = this.userToMock(user);
        return (userMock = { ...userMock, ...updateUser });
      }
      return userMock;
    });
    return result;
  }
  async delete(id: UserId): Promise<boolean> {
    const index: number = this.mockUsers.findIndex(
      (user: UserMock) => user.uuid === id.valueOf()
    );
    if (index === -1) {
      return false;
    }
    const t = this.mockUsers.splice(index, 1);
    return this.mockUsers.find((user: UserMock) => user.uuid === id.valueOf())
      ? false
      : true;
  }
  async findById(id: UserId): Promise<User | null> {
    const result: UserMock | undefined = this.mockUsers.find(
      (user: UserMock) => user.uuid === id.valueOf()
    );
    return result ? this.fromPrimitives(result) : null;
  }
  async findAll(pageSize: number, pageNumber: number): Promise<User[]> {
    const startIndex: number = (pageNumber - 1) * pageSize;
    const endIndex: number = startIndex + pageSize;
    return this.mockUsers
      .map((mockUser) => this.fromPrimitives(mockUser))
      .slice(startIndex, endIndex);
  }

  private userToMock(user: User, cipher: boolean = false): UserMock {
    const result: UserMock = {
      uuid: user.getId().valueOf(),
      name: user.getName().valueOf(),
      email: user.getEmail().valueOf(),
      phone: user.getPhone().valueOf(),
      company: user.getCompany().valueOf(),
      password: user.getPassword().valueOf(cipher),
      country_code: user.getCountryCode().valueOf(),
      roles: [
        {
          role: user.getRole()?.valueOf(),
          privileges: user.getPrivilage()?.valueOf()
        }
      ]
    };
    ObjectUtils.sanitizeObject(result);
    return result;
  }

  private fromPrimitives(result: UserMock): User {
    return User.fromPrimitives(
      result.uuid,
      result.name,
      result.email,
      result.phone,
      result.company,
      result.password,
      result.country_code,
      result.roles[0].role || 'NA' // TODO: fix this
    );
  }
}
