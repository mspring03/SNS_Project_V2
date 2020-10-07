import { EntityRepository, Repository } from 'typeorm';
import { User } from '../model/User';

@EntityRepository()
class UserRepository extends Repository<User> {
  async findByEmail(email: string) {
    return await this.createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
  }

  //   async create() {

  //   };
}

export default new UserRepository();
