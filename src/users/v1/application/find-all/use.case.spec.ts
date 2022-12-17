import { User } from '@/users/v1/domain/user';
import { UserId } from '@/users/v1/domain/user.id';
import { MockUserRepository } from '@/users/v1/domain/repository/mock.repository';
import { FindAllUsersUseCase } from '@/users/v1/application/find-all/use.case';

describe('find-all-users', () => {
  let mockUserRepository: MockUserRepository;
  let userFindAll: FindAllUsersUseCase;
  const users = [
    {
      id: '06a84abb-4249-4fcc-bde5-1423f8394161',
      name: 'Max',
      email: 'test@gmail.com',
      phone: 123456789,
      company: 'test company',
      password: '$2b$10$HpiIQA/a4WIJ.v039YW7fuWMSL3TuqVmLJ3tf2tbv0YGoFfybo17O',
      country_code: 'CO',
      role: 'admin'
    },
    {
      id: '459bed5e-c78b-49de-902d-9e0e46c91160',
      name: 'Max2',
      email: 'test2@gmail.com',
      phone: 123456782,
      company: 'test2 company',
      password: '$2b$10$HpiIQA/a4WIJ.v039YW7fuWMSL3TuqVmLJ3tf2tbv0YGoFfybo17O',
      country_code: 'MX',
      role: 'user'
    }
  ];
  beforeAll(() => {
    mockUserRepository = new MockUserRepository(users);
    userFindAll = new FindAllUsersUseCase(mockUserRepository);
  });

  it('should find all users', async () => {
    await userFindAll.main();
    const results: User[] = await mockUserRepository.findAll();
    results.forEach((result, index) => {
      expect(result).toBeDefined();
      expect(result?.getName().valueOf()).toEqual(users[index].name);
      expect(result?.getEmail().valueOf()).toEqual(users[index].email);
      expect(result?.getPhone().valueOf()).toEqual(users[index].phone);
      expect(result?.getCompany().valueOf()).toEqual(users[index].company);
      expect(result?.getPassword().valueOf().length).toEqual(60);
      expect(result?.getCountryCode().valueOf()).toEqual(
        users[index].country_code
      );
      expect(result?.getRole()?.valueOf()).toEqual(users[index].role);
    });
  });
});
