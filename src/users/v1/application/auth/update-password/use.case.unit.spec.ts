import { MockUserRepository } from '@/users/v1/domain/repository/mock.repository';
import { UserPassword } from '@/users/v1/domain/user.password';
import { MOCK_USER } from '@/users/v1/infrastructure/mock/user.mock';
import { UpdateUserPasswordUseCase } from '@/users/v1/application/auth/update-password/use.case';

describe('update password', () => {
  const password = {
    old: 'String123!',
    new: 'Temporal123!',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiZGV2aWNlSWQiOiIyMTIyMzIxMzEyIiwicHJpdmlsYWdlcyI6eyJyZXNvdXJjZXMiOlsidXNlcnMiLCJhdXRoIl0sImFjdGlvbnMiOlsiY3JlYXRlIiwicmVhZCIsInVwZGF0ZSIsImRlbGV0ZSJdfSwiaWF0IjoxNjcxMjU5NDgwLCJleHAiOjMyNDkxMzk0ODB9.3w7l_XIHFYKxV0bAQFbr094yulYJYnmwuRbcSikJGKs',
    invalidToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Indyb25nRW1haWxAZ21haWwuY29tIiwiZGV2aWNlSWQiOiIyMTIyMzIxMzEyIiwicHJpdmlsYWdlcyI6eyJyZXNvdXJjZXMiOlsidXNlcnMiLCJhdXRoIl0sImFjdGlvbnMiOlsiY3JlYXRlIiwicmVhZCJdfSwiaWF0IjoxNjcxMjU5MDAxLCJleHAiOjMyNDkxMzkwMDF9.Je7CNFjKWRqhsxmNJwZ8T9HWa_sUjfIOCu7YrbRHrXo',
    expiredToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiZGV2aWNlSWQiOiIyMTIyMzIxMzEyIiwicHJpdmlsYWdlcyI6eyJyZXNvdXJjZXMiOlsidXNlcnMiLCJhdXRoIl0sImFjdGlvbnMiOlsiY3JlYXRlIiwicmVhZCIsInVwZGF0ZSIsImRlbGV0ZSJdfSwiaWF0IjoxNjcxMjk4NDkzLCJleHAiOjE2NzEyOTg0OTR9.mVEPW9H4nGRvognI1O3m7MOTz0bUsPW5xbH3IXIMidE',
    wrongUserToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Indyb25nRW1haWxAZ21haWwuY29tIiwiZGV2aWNlSWQiOiIyMTIyMzIxMzEyIiwicHJpdmlsYWdlcyI6eyJyZXNvdXJjZXMiOlsidXNlcnMiLCJhdXRoIl0sImFjdGlvbnMiOlsiY3JlYXRlIiwicmVhZCIsInVwZGF0ZSIsImRlbGV0ZSJdfSwiaWF0IjoxNjcxMjU5MDAxLCJleHAiOjMyNDkxMzkwMDF9.9MhlmmR8rYlVqoL1etTf-5TpqddJ5C0wHdHEJvtenPA'
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
      userToken: password.token
    });

    expect(result).toBeDefined();
    expect(result).toEqual(true);
  });
  it('should change password with valid token', async () => {
    const result: boolean = await userUpdate.main({
      userPassword: new UserPassword(``),
      userNewPassword: new UserPassword(`${password.new}2`),
      userToken: password.token
    });

    expect(result).toBeDefined();
    expect(result).toEqual(true);
  });

  it('should thown an error same password', async () => {
    try {
      await userUpdate.main({
        userPassword: new UserPassword(`${password.new}2`),
        userNewPassword: new UserPassword(`${password.new}2`),
        userToken: password.token
      });
    } catch (error: any) {
      expect(error.message).toBe('You cannot use the same password');
    }
  });
  it('should thown an error invalid token', async () => {
    try {
      await userUpdate.main({
        userPassword: new UserPassword(''),
        userNewPassword: new UserPassword(`${password.new}2`),
        userToken: password.invalidToken
      });
    } catch (error: any) {
      expect(error.message).toBe('JsonWebTokenError: invalid signature');
    }
  });

  it('should thown an error expired token', async () => {
    try {
      await userUpdate.main({
        userPassword: new UserPassword(''),
        userNewPassword: new UserPassword(`${password.new}2`),
        userToken: password.expiredToken
      });
    } catch (error: any) {
      expect(error.message).toBe('TokenExpiredError: jwt expired');
    }
  });
  it('should thown an error invalid email in token ', async () => {
    try {
      await userUpdate.main({
        userPassword: new UserPassword(''),
        userNewPassword: new UserPassword(`${password.new}2`),
        userToken: password.wrongUserToken
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
        userToken: password.token
      });
    } catch (error: any) {
      expect(error.message).toBe('Invalid user password');
    }
  });
});
