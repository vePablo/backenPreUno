import UserDAO from '../daos/user.dao.js';
import { generateToken } from '../helpers/jwt.js';
import { createHash, comparePassword } from '../helpers/hash.js';

class UserService {
  async createUser(data) {
    data.password = await createHash(data.password); 
    return await UserDAO.createUser(data);
  }

  async getUserById(id) {
    return await UserDAO.getUserById(id);
  }

  async getUserByEmail(email) {
    return await UserDAO.getUserByEmail(email);
  }

  async updateUser(id, data) {
    return await UserDAO.updateUser(id, data);
  }

  async deleteUser(id) {
    return await UserDAO.deleteUser(id);
  }

  async loginUser(email, password) {
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = generateToken({ id: user._id });
    return { user, token };
  }

  async getCurrentUser(userId) {
    return await UserDAO.getUserById(userId);
  }
}

export default new UserService();
