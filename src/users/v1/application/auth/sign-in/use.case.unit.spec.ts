import { LoginUseCase } from '@/users/v1/application/auth/sign-in/use.case';
import { UserEmail } from '@/users/v1/domain/user.email';
import { MockUserRepository } from '@/users/v1/domain/repository/mock.repository';
import { UserPassword } from '@/users/v1/domain/user.password';
import { AuthResponse } from '@/users/v1/application/auth.response';

describe('sign in', () => {
  const stringPassword = 'String123!';
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
  let mockUserRepository: MockUserRepository;
  let userLogin: LoginUseCase;

  beforeAll(() => {
    mockUserRepository = new MockUserRepository([user]);
    userLogin = new LoginUseCase(mockUserRepository);
  });

  it('should sign in a user', async () => {
    const result: AuthResponse = await userLogin.main({
      userEmail: new UserEmail(user.email),
      userPassword: new UserPassword(stringPassword)
    });
    expect(result).toBeDefined();
    expect(result?.getEmail().valueOf()).toEqual(user.email);
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
        userEmail: new UserEmail(user.email),
        userPassword: new UserPassword('wrongPassword123!')
      });
    } catch (error: any) {
      expect(error.message).toBe('Invalid user password');
    }
  });
});
