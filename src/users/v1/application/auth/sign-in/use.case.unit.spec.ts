import { LoginUseCase } from '@/users/v1/application/auth/sign-in/use.case';
import { UserEmail } from '@/users/v1/domain/user.email';
import { MockUserRepository } from '@/users/v1/domain/repository/mock.repository';
import { UserPassword } from '@/users/v1/domain/user.password';
import { AuthResponse } from '@/users/v1/application/auth.response';

describe('sign in', () => {
  it('should sign in a user', async () => {
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

    const mockUserRepository = new MockUserRepository([user]);

    const userCreate = new LoginUseCase(mockUserRepository);

    const result: AuthResponse = await userCreate.main({
      userEmail: new UserEmail(user.email),
      userPassword: new UserPassword(stringPassword)
    });

    expect(result).toBeDefined();
    expect(result?.getEmail().valueOf()).toEqual(user.email);
    expect(result?.getToken().valueOf().length).toBeGreaterThan(310);
  });
});
