import { User } from '@/users/v1/domain/user';
import { UserId } from '@/users/v1/domain/user.id';
import { MockUserRepository } from '@/users/v1/domain/repository/mock.repository';
import { FindUserUseCase } from '@/users/v1/application/find/use.case';

describe('find-user', () => {
  let mockUserRepository: MockUserRepository;
  let userFind: FindUserUseCase;
  const user = {
    id: '06a84abb-4249-4fcc-bde5-1423f8394161',
    name: 'Max',
    email: 'test@gmail.com',
    phone: 123456789,
    company: 'test company',
    password: '$2b$10$HpiIQA/a4WIJ.v039YW7fuWMSL3TuqVmLJ3tf2tbv0YGoFfybo17O',
    country_code: 'CO',
    role: 'admin'
  };
  beforeAll(() => {
    mockUserRepository = new MockUserRepository([user]);
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
      userId: new UserId(user.id)
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
