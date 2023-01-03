import { ValueObject } from '@/shared/domain/value-objects/value.object';
import compare from '@/shared/infrastructure/utils/compare';
import { UserInvalid } from '@/users/v1/domain/exceptions/invalid';
import validate from '@/shared/infrastructure/validator/validator';

export type permissions = {
  resource: string;
  actions: string[];
}[];
export class UserPermissions implements ValueObject<permissions> {
  constructor(private permissions: permissions) {
    this.validate(permissions);
  }

  fromPrimitive(value: permissions): ValueObject<permissions> {
    return new UserPermissions(value);
  }

  validate(value: permissions): void {
    if (value && !validate.isArray(value)) {
      throw new UserInvalid('permissions');
    }
    if (value && value.length > 0) {
      value.forEach((permission) => {
        if (!validate.isResource(permission.resource)) {
          throw new UserInvalid('resource');
        }
        if (validate.isArray(permission.actions)) {
          const valid = permission.actions?.every((action) =>
            validate.isAction(action)
          );
          if (!valid) throw new UserInvalid('actions');
        }
      });
    }
  }

  valueOf(): permissions {
    return this.permissions;
  }
  equals(object: ValueObject<permissions>): boolean {
    return compare.object(object.valueOf(), this.valueOf());
  }

  default(): permissions {
    return [
      {
        resource: 'users',
        actions: ['read']
      },
      {
        resource: 'auth',
        actions: ['create', 'read', 'update', 'delete']
      },
      {
        resource: 'permission',
        actions: ['create']
      }
    ];
  }
}
