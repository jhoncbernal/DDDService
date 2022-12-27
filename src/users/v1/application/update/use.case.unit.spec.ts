import { User } from '@/users/v1/domain/user';
import { MockUserRepository } from '@/users/v1/domain/repository/mock.repository';
import {
  MOCK_UPDATED_USER,
  MOCK_USER
} from '@/users/v1/infrastructure/mock/user.mock';
import { UpdateUserUseCase } from '@/users/v1/application/update/use.case';
import { UserName } from '@/users/v1/domain/user.name';

describe('update-users', () => {
  let mockUserRepository: MockUserRepository;
  let userUpdate: UpdateUserUseCase;
  const user = User.fromPrimitives(
    MOCK_USER.uuid,
    MOCK_UPDATED_USER.name,
    MOCK_UPDATED_USER.email,
    MOCK_UPDATED_USER.phone,
    MOCK_UPDATED_USER.company,
    MOCK_UPDATED_USER.password,
    MOCK_UPDATED_USER.country_code,
    MOCK_UPDATED_USER.role,
    MOCK_UPDATED_USER.permissions
  );
  const emptyUser = User.fromPrimitives(
    MOCK_USER.uuid,
    '',
    '',
    0,
    '',
    '',
    '',
    '',
    []
  );

  beforeAll(() => {
    mockUserRepository = new MockUserRepository([MOCK_USER]);
    userUpdate = new UpdateUserUseCase(mockUserRepository);
  });
  it('should not update anything', async () => {
    await userUpdate.main({
      userId: user.getId(),
      userName: emptyUser.getName(),
      userEmail: emptyUser.getEmail(),
      userPhone: emptyUser.getPhone(),
      userCompany: emptyUser.getCompany(),
      userCountryCode: emptyUser.getCountryCode()
    });
    const result: User | null = await mockUserRepository.findById(user.getId());
    expect(result).toBeDefined();
    expect(result?.getName().valueOf()).toEqual(MOCK_USER.name);
    expect(result?.getEmail().valueOf()).toEqual(MOCK_USER.email);
    expect(result?.getPhone().valueOf()).toEqual(MOCK_USER.phone);
    expect(result?.getCompany().valueOf()).toEqual(MOCK_USER.company);
    expect(result?.getPassword().valueOf().length).toEqual(60);
    expect(result?.getCountryCode().valueOf()).toEqual(MOCK_USER.country_code);
    expect(result?.getRole()?.valueOf()).toEqual(MOCK_USER.role);
    expect(result?.getPermissions()?.valueOf()).toEqual(MOCK_USER.permissions);
  });
  it('should update user all allow values', async () => {
    await userUpdate.main({
      userId: user.getId(),
      userName: user.getName(),
      userEmail: user.getEmail(),
      userPhone: user.getPhone(),
      userCompany: user.getCompany(),
      userCountryCode: user.getCountryCode()
    });
    const result: User | null = await mockUserRepository.findById(user.getId());
    expect(result).toBeDefined();
    expect(result?.getName().valueOf()).toEqual(MOCK_UPDATED_USER.name);
    expect(result?.getEmail().valueOf()).toEqual(MOCK_UPDATED_USER.email);
    expect(result?.getPhone().valueOf()).toEqual(MOCK_UPDATED_USER.phone);
    expect(result?.getCompany().valueOf()).toEqual(MOCK_UPDATED_USER.company);
    expect(result?.getPassword().valueOf().length).toEqual(60);
    expect(result?.getCountryCode().valueOf()).toEqual(
      MOCK_UPDATED_USER.country_code
    );
    expect(result?.getRole()?.valueOf()).toEqual(MOCK_UPDATED_USER.role);
    expect(result?.getPermissions()?.valueOf()).toEqual(
      MOCK_UPDATED_USER.permissions
    );
  });

  it('should update user name', async () => {
    const name = 'Max New Name';
    await userUpdate.main({
      userId: user.getId(),
      userName: new UserName(name),
      userEmail: emptyUser.getEmail(),
      userPhone: emptyUser.getPhone(),
      userCompany: emptyUser.getCompany(),
      userCountryCode: emptyUser.getCountryCode()
    });
    const result: User | null = await mockUserRepository.findById(user.getId());
    expect(result).toBeDefined();
    expect(result?.getName().valueOf()).toEqual(name);
    expect(result?.getEmail().valueOf()).toEqual(MOCK_UPDATED_USER.email);
    expect(result?.getPhone().valueOf()).toEqual(MOCK_UPDATED_USER.phone);
    expect(result?.getCompany().valueOf()).toEqual(MOCK_UPDATED_USER.company);
    expect(result?.getPassword().valueOf().length).toEqual(60);
    expect(result?.getCountryCode().valueOf()).toEqual(
      MOCK_UPDATED_USER.country_code
    );
    expect(result?.getRole()?.valueOf()).toEqual(MOCK_UPDATED_USER.role);
    expect(result?.getPermissions()?.valueOf()).toEqual(
      MOCK_UPDATED_USER.permissions
    );
  });
});
