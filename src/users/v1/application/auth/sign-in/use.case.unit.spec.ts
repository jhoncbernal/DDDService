import { LoginUseCase } from '@/users/v1/application/auth/sign-in/use.case';
import { UserEmail } from '@/users/v1/domain/user.email';
import { MockUserRepository } from '@/users/v1/domain/repository/mock.repository';
import { UserPassword } from '@/users/v1/domain/user.password';
import { AuthResponse } from '@/users/v1/application/auth.response';
import { MOCK_USER } from '@/users/v1/infrastructure/mock/user.mock';

describe('sign in', () => {
  const stringPassword = 'String123!';
  let mockUserRepository: MockUserRepository;
  let userLogin: LoginUseCase;

  beforeAll(() => {
    mockUserRepository = new MockUserRepository([MOCK_USER]);
    userLogin = new LoginUseCase(mockUserRepository);
  });

  it('should sign in a user', async () => {
    const result: AuthResponse = await userLogin.main({
      userEmail: new UserEmail(MOCK_USER.email),
      userPassword: new UserPassword(stringPassword)
    });
    expect(result).toBeDefined();
    expect(result?.getEmail().valueOf()).toEqual(MOCK_USER.email);
    expect(result?.getToken().valueOf().length).toBeGreaterThan(310);
  });

  it('should thown an error invalid email', async () => {
    try {
      await userLogin.main({
        userEmail: new UserEmail('wrongEmail@gmail.com'),
        userPassword: new UserPassword(stringPassword)
      });
    } catch (error: any) {
      expect(error.message).toBe('User wrongEmail@gmail.com is not found');
    }
  });
  it('should thown an error invalid password', async () => {
    try {
      await userLogin.main({
        userEmail: new UserEmail(MOCK_USER.email),
        userPassword: new UserPassword('wrongPassword123!')
      });
    } catch (error: any) {
      expect(error.message).toBe('Invalid user password');
    }
  });
});
