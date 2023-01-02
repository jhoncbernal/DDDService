import { User } from '@/users/v1/domain/user';
import { UserId } from '@/users/v1/domain/user.id';
import { MockUserRepository } from '@/users/v1/domain/repository/mock.repository';
import { FindUserUseCase } from '@/users/v1/application/find/use.case';
import { MOCK_USER } from '@/users/v1/infrastructure/mock/user.mock';

describe('find-user', () => {
  let mockUserRepository: MockUserRepository;
  let userFind: FindUserUseCase;

  beforeAll(() => {
    mockUserRepository = new MockUserRepository([MOCK_USER]);
    userFind = new FindUserUseCase(mockUserRepository);
  });
  it('should thown an error invalid ID', async () => {
    try {
      const wrongId = 'd05f0b73-d2dd-4b58-b82a-39ca734ee9b';
      await userFind.main({
        userId: new UserId(wrongId)
      });
    } catch (error: any) {
      expect(error.message).toBe(
        'The UUID d05f0b73-d2dd-4b58-b82a-39ca734ee9b is invalid'
      );
    }
  });
  it('should thown an error user not found', async () => {
    try {
      const wrongId = 'd05f0b73-d2dd-4b58-b82a-39ca734ee9b0';
      await userFind.main({
        userId: new UserId(wrongId)
      });
    } catch (error: any) {
      expect(error.message).toBe(
        'User d05f0b73-d2dd-4b58-b82a-39ca734ee9b0 is not found'
      );
    }
  });
  it('should find a user', async () => {
    await userFind.main({
      userId: new UserId(MOCK_USER.uuid)
    });
    const result: User | null = await mockUserRepository.findById(
      new UserId(MOCK_USER.uuid)
    );
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
});
