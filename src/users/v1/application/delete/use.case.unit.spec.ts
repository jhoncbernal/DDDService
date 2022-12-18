import { User } from '@/users/v1/domain/user';
import { UserId } from '@/users/v1/domain/user.id';
import { MockUserRepository } from '@/users/v1/domain/repository/mock.repository';
import { DeleteUserUseCase } from '@/users/v1/application/delete/use.case';
import { MOCK_USER } from '@/users/v1/infrastructure/mock/user.mock';

describe('delete-user', () => {
  let mockUserRepository: MockUserRepository;
  let userDelete: DeleteUserUseCase;
  const wrongId = 'd05f0b73-d2dd-4b58-b82a-39ca734ee9b0';

  beforeAll(() => {
    mockUserRepository = new MockUserRepository([MOCK_USER]);
    userDelete = new DeleteUserUseCase(mockUserRepository);
  });
  it('should thown an error invalid ID', async () => {
    const invalidId = wrongId.slice(0, -1);
    try {
      await userDelete.main({
        userId: new UserId(invalidId)
      });
    } catch (error: any) {
      expect(error.message).toBe(`The UUID ${invalidId} is invalid`);
    }
  });
  it('should thown an error user not found', async () => {
    try {
      await userDelete.main({
        userId: new UserId(wrongId)
      });
    } catch (error: any) {
      expect(error.message).toBe(`User ${wrongId} is not found`);
    }
  });
  it('should delete a user', async () => {
    await userDelete.main({
      userId: new UserId(MOCK_USER.uuid)
    });
    const result: User | null = await mockUserRepository.findById(
      new UserId(MOCK_USER.uuid)
    );
    expect(result).toBeNull();
  });
});
