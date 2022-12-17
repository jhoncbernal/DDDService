import { injectable } from 'inversify';
import {
  UserRepository,
  userTypes,
  UserId,
  UserPassword
} from '@/users/v1/domain/user.repository';
import { User } from '@/users/v1/domain/user';
import { UserName } from '../user.name';
import { UserPrivilage } from '../roles/privilages/user.privilage';
import { UserRole } from '../roles/user.role';
import { UserCompany } from '../user.company';
import { UserCountryCode } from '../user.country.code';
import { UserEmail } from '../user.email';
import { UserPhone } from '../user.phone';
import { mock } from 'jest-mock-extended';
type UserMock = {
  id: string;
  name: string;
  email: string;
  phone: number;
  company: string;
  password: string;
  country_code: string;
  role?: string;
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
    if (user) return this.mockToUser(user);
  }
  async updatePassword(id: UserId, password: UserPassword): Promise<boolean> {
    let result = false;
    this.mockUsers.forEach((user: UserMock) => {
      if (user.id === id.valueOf()) {
        user.password = password.valueOf(true);
        result = true;
      }
    });
    return result;
  }
  async update(user: User): Promise<boolean> {
    const result = true;
    this.mockUsers = this.mockUsers.map((userMock: UserMock) => {
      if (userMock.id === user.getId().valueOf()) {
        const updateUser = this.userToMock(user);
        return (userMock = { ...userMock, ...updateUser });
      }
      return userMock;
    });
    return result;
  }
  async delete(id: UserId): Promise<boolean> {
    const index: number = this.mockUsers.findIndex(
      (user: UserMock) => user.id === id.valueOf()
    );
    await this.mockUsers.splice(index, 1);
    return this.mockUsers.find((user: UserMock) => user.id === id.valueOf())
      ? false
      : true;
  }
  async findById(id: UserId): Promise<User | null> {
    const result: any = this.mockUsers.find(
      (user: UserMock) => user.id === id.valueOf()
    );
    return this.mockToUser(result);
  }
  async findAll(): Promise<User[]> {
    return this.mockUsers.map((mockUser) => this.mockToUser(mockUser));
  }

  private userToMock(user: User, cipher: boolean = false): UserMock {
    return {
      id: user.getId().valueOf(),
      name: user.getName().valueOf(),
      email: user.getEmail().valueOf(),
      phone: user.getPhone().valueOf(),
      company: user.getCompany().valueOf(),
      password: user.getPassword().valueOf(cipher),
      country_code: user.getCountryCode().valueOf(),
      role: user.getRole()?.valueOf()
    };
  }
  private mockToUser(user: UserMock): User {
    return new User(
      new UserId(user.id),
      new UserName(user.name),
      new UserEmail(user.email),
      new UserPhone(user.phone),
      new UserCompany(user.company),
      new UserPassword(user.password),
      new UserCountryCode(user.country_code),
      new UserRole(user.role || 'NA'),
      new UserPrivilage(user.role || 'NA')
    );
  }
}
