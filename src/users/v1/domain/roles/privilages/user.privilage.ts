import { ValueObject } from '@/shared/infrastructure/value-objects/value.object';
import { UserRole } from '@/users/v1/domain/roles/user.role';
import { UserAction } from '@/users/v1/domain/roles/privilages/actions/user.action';
import { UserResource } from './resources/user.resource';

export type privilege = {
  resources: Array<string>;
  actions: Array<string>;
};
export class UserPrivilage implements ValueObject<privilege> {
  private actions;
  private resources;
  constructor(private value: string) {
    const role = new UserRole(this.value);
    this.actions = new UserAction(role.valueOf());
    this.resources = new UserResource(role.valueOf());
  }
  fromPrimitive(value: privilege): ValueObject<privilege> {
    throw new Error('Method not implemented.');
  }

  validate(value: privilege): void {}

  valueOf(): privilege {
    return {
      resources: this.actions.valueOf(),
      actions: this.resources.valueOf()
    };
  }
  equals(object: ValueObject<privilege>): boolean {
    return this.valueOf() == object.valueOf();
  }
}
