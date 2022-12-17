import { User } from '@/users/v1/domain/user';
import { UserId } from '@/users/v1/domain/user.id';
import { MockUserRepository } from '@/users/v1/domain/repository/mock.repository';
import { DeleteUserUseCase } from '@/users/v1/application/delete/use.case';

describe('delete-user', () => {
  let mockUserRepository: MockUserRepository;
  let userDelete: DeleteUserUseCase;
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
  beforeAll(() => {
    mockUserRepository = new MockUserRepository([user]);
    userDelete = new DeleteUserUseCase(mockUserRepository);
  });
  it('should thown an error invalid ID', async () => {
    try {
      const wrongId = 'd05f0b73-d2dd-4b58-b82a-39ca734ee9b';
      await userDelete.main({
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
      await userDelete.main({
        userId: new UserId(wrongId)
      });
    } catch (error: any) {
      expect(error.message).toBe(
        'User d05f0b73-d2dd-4b58-b82a-39ca734ee9b0 is not found'
      );
    }
  });
  it('should delete a user', async () => {
    await userDelete.main({
      userId: new UserId(user.id)
    });
    const result: User | null = await mockUserRepository.findById(
      new UserId(user.id)
    );
    expect(result).toBeNull();
  });
});
