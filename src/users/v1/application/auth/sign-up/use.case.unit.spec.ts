import { CreateUserUseCase } from '@/users/v1/application/auth/sign-up/use.case';
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
import { UserCountryCode } from '@/users/v1/domain/user.country.code';

let users: any = [];

describe('create-user', () => {
  it('should create a user', async () => {
    const user = {
      id: '06a84abb-4249-4fcc-bde5-1423f8394161',
      name: 'Max',
      email: 'test@gmail.com',
      phone: 123456789,
      company: 'test company',
      password: 'String123!',
      country_code: 'CO',
      role: 'admin'
    };

    const mockUserRepository = new MockUserRepository([]);

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
      userCountryCode: new UserCountryCode(user.country_code),
      userRole: new UserRole(user.role),
      userPrivilage: new UserPrivilage(user.role)
    });

    const result: User | null = await mockUserRepository.findById(
      new UserId(user.id)
    );

    expect(result).toBeDefined();
    expect(result?.getName().valueOf()).toEqual(user.name);
    expect(result?.getEmail().valueOf()).toEqual(user.email);
    expect(result?.getPhone().valueOf()).toEqual(user.phone);
    expect(result?.getCompany().valueOf()).toEqual(user.company);
    expect(result?.getPassword().valueOf().length).toEqual(60);
    expect(result?.getCountryCode().valueOf()).toEqual(user.country_code);
    expect(result?.getRole()?.valueOf()).toEqual(user.role);
  });
});
