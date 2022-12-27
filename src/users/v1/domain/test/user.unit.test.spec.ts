import {
  MOCK_INVALID_USER,
  MOCK_USER
} from '@/users/v1/infrastructure/mock/user.mock';
import { User } from '@/users/v1/domain/user';
import { UserId } from '@/users/v1/domain/user.id';

let invalidUser: User;
const emptyUser = User.fromPrimitives(
  MOCK_USER.uuid,
  '',
  '',
  0,
  '',
  '',
  '',
  '',
  []
);

describe('User domain Invalid params', () => {
  it('should thown an error invalid ID', async () => {
    const invalidId = 'd05f0b73-d2dd-4b58-b82a-39ca734ee9';
    let invalidUser: UserId;
    try {
      invalidUser = new UserId(invalidId);
    } catch (error: any) {
      expect(error.getErrorMessage()).toBe(`The UUID ${invalidId} is invalid`);
    }
  });
  it('should thrown a invalid name', async () => {
    try {
      invalidUser = User.fromPrimitives(
        MOCK_USER.uuid,
        MOCK_INVALID_USER.name,
        MOCK_INVALID_USER.email,
        MOCK_INVALID_USER.phone,
        MOCK_INVALID_USER.company,
        MOCK_INVALID_USER.password,
        MOCK_INVALID_USER.country_code,
        MOCK_INVALID_USER.role,
        MOCK_INVALID_USER.permissions
      );
    } catch (error: any) {
      expect(error.getErrorMessage()).toBe(
        `User name must be between 3 and 50 characters long`
      );
    }
  });
  it('should thrown a invalid email', async () => {
    try {
      invalidUser = User.fromPrimitives(
        MOCK_USER.uuid,
        emptyUser.getName().valueOf(),
        MOCK_INVALID_USER.email,
        emptyUser.getPhone().valueOf(),
        emptyUser.getCompany().valueOf(),
        emptyUser.getPassword().valueOf(),
        emptyUser.getCountryCode().valueOf(),
        '',
        []
      );
    } catch (error: any) {
      expect(error.getErrorMessage()).toBe(`Invalid user email`);
    }
  });

  it('should thrown a invalid phone', async () => {
    try {
      invalidUser = User.fromPrimitives(
        MOCK_USER.uuid,
        emptyUser.getName().valueOf(),
        emptyUser.getEmail().valueOf(),
        MOCK_INVALID_USER.phone,
        emptyUser.getCompany().valueOf(),
        emptyUser.getPassword().valueOf(),
        emptyUser.getCountryCode().valueOf(),
        '',
        []
      );
    } catch (error: any) {
      expect(error.getErrorMessage()).toBe(`User phone is invalid`);
    }
  });
  it('should thrown a invalid company', async () => {
    try {
      invalidUser = User.fromPrimitives(
        MOCK_USER.uuid,
        emptyUser.getName().valueOf(),
        emptyUser.getEmail().valueOf(),
        emptyUser.getPhone().valueOf(),
        MOCK_INVALID_USER.company,
        emptyUser.getPassword().valueOf(),
        emptyUser.getCountryCode().valueOf(),
        '',
        []
      );
    } catch (error: any) {
      expect(error.getErrorMessage()).toBe(`User company is invalid`);
    }
  });
  it('should thrown a invalid password', async () => {
    try {
      invalidUser = User.fromPrimitives(
        MOCK_USER.uuid,
        emptyUser.getName().valueOf(),
        emptyUser.getEmail().valueOf(),
        emptyUser.getPhone().valueOf(),
        emptyUser.getCompany().valueOf(),
        MOCK_INVALID_USER.password,
        emptyUser.getCountryCode().valueOf(),
        '',
        []
      );
    } catch (error: any) {
      expect(error.getErrorMessage()).toBe(`Password is not strong enough`);
    }
  });
  it('should thrown a invalid country code', async () => {
    try {
      invalidUser = User.fromPrimitives(
        MOCK_USER.uuid,
        emptyUser.getName().valueOf(),
        emptyUser.getEmail().valueOf(),
        emptyUser.getPhone().valueOf(),
        emptyUser.getCompany().valueOf(),
        emptyUser.getPassword().valueOf(),
        MOCK_INVALID_USER.country_code,
        '',
        []
      );
    } catch (error: any) {
      expect(error.getErrorMessage()).toBe(`Invalid user country`);
    }
  });
});
