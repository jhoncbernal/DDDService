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
import { UserRole } from '@/users/v1/domain/user.role';
import { UserPermissions } from '@/users/v1/domain/permissions/user.permission';
import { UserCountryCode } from '@/users/v1/domain/user.country.code';
import { MOCK_NEW_USER } from '@/users/v1/infrastructure/mock/user.mock';
describe('create-user', () => {
  it('should create a user', async () => {
    const mockUserRepository = new MockUserRepository([]);

    const userCreate = new CreateUserUseCase(
      mockUserRepository,
      mock<EventBus>()
    );
    await userCreate.main({
      userId: new UserId(MOCK_NEW_USER.uuid),
      userName: new UserName(MOCK_NEW_USER.name),
      userEmail: new UserEmail(MOCK_NEW_USER.email),
      userPhone: new UserPhone(MOCK_NEW_USER.phone),
      userCompany: new UserCompany(MOCK_NEW_USER.company),
      userPassword: new UserPassword(MOCK_NEW_USER.password),
      userCountryCode: new UserCountryCode(MOCK_NEW_USER.country_code),
      userRole: new UserRole(MOCK_NEW_USER.role),
      userPermission: new UserPermissions(MOCK_NEW_USER.permissions)
    });

    const result: User | null = await mockUserRepository.findById(
      new UserId(MOCK_NEW_USER.uuid)
    );

    expect(result).toBeDefined();
    if (result) {
      expect(result.getName().equals(new UserName(MOCK_NEW_USER.name))).toEqual(
        true
      );
      expect(
        result.getEmail().equals(new UserEmail(MOCK_NEW_USER.email))
      ).toEqual(true);
      expect(
        result.getPhone().equals(new UserPhone(MOCK_NEW_USER.phone))
      ).toEqual(true);
      expect(
        result.getCompany().equals(new UserCompany(MOCK_NEW_USER.company))
      ).toEqual(true);
      expect(
        new UserPassword(MOCK_NEW_USER.password).equals(result.getPassword())
      ).toEqual(true);
      expect(
        result
          .getCountryCode()
          .equals(new UserCountryCode(MOCK_NEW_USER.country_code))
      ).toEqual(true);
      expect(
        result.getRole()?.equals(new UserRole(MOCK_NEW_USER.role))
      ).toEqual(true);

      expect(
        result
          .getPermissions()
          ?.equals(new UserPermissions(MOCK_NEW_USER.permissions))
      ).toEqual(true);
    }
  });
  it('should throw an error if user already exists', async () => {
    try {
      const mockUserRepository = new MockUserRepository([MOCK_NEW_USER]);

      const userCreate = new CreateUserUseCase(
        mockUserRepository,
        mock<EventBus>()
      );

      const result = await userCreate.main({
        userId: new UserId(MOCK_NEW_USER.uuid),
        userName: new UserName(MOCK_NEW_USER.name),
        userEmail: new UserEmail(MOCK_NEW_USER.email),
        userPhone: new UserPhone(MOCK_NEW_USER.phone),
        userCompany: new UserCompany(MOCK_NEW_USER.company),
        userPassword: new UserPassword(MOCK_NEW_USER.password),
        userCountryCode: new UserCountryCode(MOCK_NEW_USER.country_code),
        userRole: new UserRole(MOCK_NEW_USER.role),
        userPermission: new UserPermissions(MOCK_NEW_USER.permissions)
      });
      expect(result).toBeUndefined();
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error?.message).toEqual(`User already exists`);
    }
  });
});
