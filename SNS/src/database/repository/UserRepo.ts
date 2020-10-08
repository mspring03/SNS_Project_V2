import { EntityRepository, Repository } from 'typeorm';
import { User } from '../model/User';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  public async findByEmail(email: string): Promise<User> {
    return await this.createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
  }

  public async createUser(
    email: string,
    password: string,
    nickname: string,
  ): Promise<User> {
    const user = new User();
    user.email = email;
    user.password = password;
    user.nickname = nickname;
    return await this.manager.save(user);
  }
}
