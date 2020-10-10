import { EntityRepository, Repository } from 'typeorm';
import { loginKey } from '../model/loginKey';

@EntityRepository(loginKey)
export default class LoginKeyRepository extends Repository<loginKey> {
  public async createKey(key: string) {
    const loginkey = new loginKey();
    loginkey.key = key;
    await this.manager.save(loginKey);
  }

  public async findKey(key: string): Promise<loginKey> {
    return await this.createQueryBuilder('loginkey')
      .where('loginkey.key = :key', { key })
      .getOne();
  }

  public async removeKey(key: string) {
    await this.createQueryBuilder('loginkey')
      .delete()
      .from(loginKey)
      .where('loginkey.key = :key', { key });
  }
}
