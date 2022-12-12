import { CreateUserUseCase } from '@/users/v1/application/auth/sing-up/use.case';
import { User } from '@/users/v1/domain/user';
import { UserId } from '@/users/v1/domain/user.id';
import { UserName } from '@/users/v1/domain/user.name';
import { UserEmail } from '@/users/v1/domain/user.email';
import { UserPhone } from '@/users/v1/domain/user.phone';
import { UserCompany } from '@/users/v1/domain/user.company';
import { MockUserRepository } from '@/users/v1/domain/repository/mock.repository';
import { EventBus } from '@/shared/domain/event-bus/event.bus';
import { mock } from 'jest-mock-extended';
import { UserPassword } from '@/users/v1/domain/user.password';
import { UserRole } from '@/users/v1/domain/roles/user.role';
import { UserPrivilage } from '@/users/v1/domain/roles/privilages/user.privilage';

let users: any = [];

describe('create-user', () => {
  it('should create a user', async () => {
    const user = {
      id: '06a84abb-4249-4fcc-bde5-1423f8394161',
      name: 'Max',
      email: 'test@gmail.com',
      phone: 123456789,
      company: 'test company',
      password: '123456',
      role: 'admin'
    };

    const mockUserRepository = new MockUserRepository(users);

    const userCreate = new CreateUserUseCase(
      mockUserRepository,
      mock<EventBus>()
    );

    await userCreate.main({
      userId: new UserId(user.id),
      userName: new UserName(user.name),
      userEmail: new UserEmail(user.email),
      userPhone: new UserPhone(user.phone),
      userCompany: new UserCompany(user.company),
      userPassword: new UserPassword(user.password),
      userRole: new UserRole(user.role),
      userPrivilage: new UserPrivilage(user.role)
    });

    const result: User = users.find(
      (d: User) => d.getId().valueOf() === user.id
    );

    expect(result).toBeDefined();
    expect(result?.getName().valueOf()).toEqual('Max');
    expect(result?.getEmail().valueOf()).toEqual('test@gmail.com');
    expect(result?.getPhone().valueOf()).toEqual(123456789);
    expect(result?.getCompany().valueOf()).toEqual('test company');
    expect(result?.getPassword().valueOf()).toEqual('123456');
  });
});
