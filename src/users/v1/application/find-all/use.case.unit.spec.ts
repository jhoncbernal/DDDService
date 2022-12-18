import { User } from '@/users/v1/domain/user';
import { MockUserRepository } from '@/users/v1/domain/repository/mock.repository';
import { FindAllUsersUseCase } from '@/users/v1/application/find-all/use.case';
import { MOCK_USERS } from '@/users/v1/infrastructure/mock/user.mock';

describe('find-all-users', () => {
  let mockUserRepository: MockUserRepository;
  let userFindAll: FindAllUsersUseCase;

  beforeAll(() => {
    mockUserRepository = new MockUserRepository(MOCK_USERS);
    userFindAll = new FindAllUsersUseCase(mockUserRepository);
  });

  it('should find all users', async () => {
    await userFindAll.main();
    const results: User[] = await mockUserRepository.findAll();
    results.forEach((result, index) => {
      expect(result).toBeDefined();
      expect(result?.getName().valueOf()).toEqual(MOCK_USERS[index].name);
      expect(result?.getEmail().valueOf()).toEqual(MOCK_USERS[index].email);
      expect(result?.getPhone().valueOf()).toEqual(MOCK_USERS[index].phone);
      expect(result?.getCompany().valueOf()).toEqual(MOCK_USERS[index].company);
      expect(result?.getPassword().valueOf().length).toEqual(60);
      expect(result?.getCountryCode().valueOf()).toEqual(
        MOCK_USERS[index].country_code
      );
      expect(result?.getRole()?.valueOf()).toEqual(
        MOCK_USERS[index].roles[0].role
      );
      expect(result?.getPrivilage()?.valueOf()).toEqual(
        MOCK_USERS[index].roles[0].privileges
      );
    });
  });
});
