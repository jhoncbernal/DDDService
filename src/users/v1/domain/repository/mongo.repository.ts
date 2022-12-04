import { injectable } from 'inversify';
import { UserModel } from '@/users/v1/infrastructure/model/user.mongoose';
import { UserRepository, userTypes } from '@/users/v1/domain/user.repository';
import { User } from '@/users/v1/domain/user';
import { UserId } from '@/users/v1/domain/user.id';

@injectable()
export class MongoUserRepository implements UserRepository {
  async save(user: User): Promise<void> {
    await UserModel.create({
      uuid: user.getId().valueOf(),
      name: user.getName().valueOf(),
      email: user.getEmail().valueOf(),
      phone: user.getPhone().valueOf(),
      company: user.getCompany().valueOf(),
      password: user.getPassword().valueOf(),
      roles: [
        {
          role: user.getRole()?.valueOf(),
          privileges: [user.getPrivilage()?.valueOf()]
        }
      ]
    });
  }

  async update(user: User): Promise<boolean> {
    const result: any = await UserModel.updateOne(
      {
        uuid: user.getId().valueOf()
      },
      {
        name: user.getName().valueOf(),
        email: user.getEmail().valueOf(),
        phone: user.getPhone().valueOf(),
        company: user.getCompany().valueOf(),
        password: user.getPassword().valueOf(),
        token: user.getToken()?.valueOf()
      }
    );
    return result.modifiedCount > 0;
  }

  async delete(id: UserId): Promise<boolean> {
    const result: any = await UserModel.deleteOne({
      uuid: id.valueOf()
    });

    return result.deletedCount > 0;
  }

  async findById(id: UserId): Promise<User | null> {
    const result: Object = await UserModel.findOne({
      uuid: id.valueOf()
    }).lean();

    return result ? this.fromPrimitives(result) : null;
  }

  async findBy(params: string, value: userTypes): Promise<User | null> {
    const result: Object = await UserModel.findOne({
      [params]: value.valueOf()
    }).lean();
    return result ? this.fromPrimitives(result) : null;
  }

  async findAll(): Promise<User[]> {
    const result: Object[] = await UserModel.find({}).lean();
    return result.map(this.fromPrimitives);
  }

  private fromPrimitives(result: any): User {
    return User.fromPrimitives(
      result.uuid,
      result.name,
      result.email,
      result.phone,
      result.company,
      result.password,
      result.roles[0].role, // TODO: fix this
      result.token
    );
  }
}
