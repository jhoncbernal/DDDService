import { MockUserRepository } from '@/users/v1/domain/repository/mock.repository';
import { UserPassword } from '@/users/v1/domain/user.password';
import { MOCK_USER } from '@/users/v1/infrastructure/mock/user.mock';
import { UpdateUserPasswordUseCase } from '@/users/v1/application/auth/update-password/use.case';
import { UserEmail } from '@/users/v1/domain/user.email';

describe('update password', () => {
  const password = {
    old: 'String123!',
    new: 'Temporal123!',
    email: 'test@gmail.com',
    wrongEmail: 'wrongEmail@gmail.com',
    invalidEmail: 'invalidgmail.com'
  };
  let mockUserRepository: MockUserRepository;
  let userUpdate: UpdateUserPasswordUseCase;
  beforeAll(() => {
    mockUserRepository = new MockUserRepository([MOCK_USER]);
    userUpdate = new UpdateUserPasswordUseCase(mockUserRepository);
  });
  it('should change password ', async () => {
    const result: boolean = await userUpdate.main({
      userPassword: new UserPassword(password.old),
      userNewPassword: new UserPassword(`${password.new}1`),
      userEmail: new UserEmail(password.email)
    });

    expect(result).toBeDefined();
    expect(result).toEqual(true);
  });
  it('should change password with valid email', async () => {
    const result: boolean = await userUpdate.main({
      userPassword: new UserPassword(``),
      userNewPassword: new UserPassword(`${password.new}2`),
      userEmail: new UserEmail(password.email)
    });

    expect(result).toBeDefined();
    expect(result).toEqual(true);
  });

  it('should thown an error same password', async () => {
    try {
      await userUpdate.main({
        userPassword: new UserPassword(`${password.new}2`),
        userNewPassword: new UserPassword(`${password.new}2`),
        userEmail: new UserEmail(password.email)
      });
    } catch (error: any) {
      expect(error.message).toBe('You cannot use the same password');
    }
  });
  it('should thown an error invalid email', async () => {
    try {
      await userUpdate.main({
        userPassword: new UserPassword(''),
        userNewPassword: new UserPassword(`${password.new}2`),
        userEmail: new UserEmail(password.invalidEmail)
      });
    } catch (error: any) {
      expect(error.getErrorMessage()).toBe('Invalid user email');
    }
  });

  it('should thown an error invalid email ', async () => {
    try {
      await userUpdate.main({
        userPassword: new UserPassword(''),
        userNewPassword: new UserPassword(`${password.new}2`),
        userEmail: new UserEmail(password.wrongEmail)
      });
    } catch (error: any) {
      expect(error.message).toBe('User wrongEmail@gmail.com is not found');
    }
  });
  it('should thown an error wrong password', async () => {
    try {
      await userUpdate.main({
        userPassword: new UserPassword('wrongPassword123!'),
        userNewPassword: new UserPassword(`${password.new}`),
        userEmail: new UserEmail(password.email)
      });
    } catch (error: any) {
      expect(error.message).toBe('Invalid user password');
    }
  });
});
