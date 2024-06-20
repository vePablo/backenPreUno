import UserDAO from '../daos/user.dao.js';

class UserService {
  async createUser(data) {
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
}

export default new UserService();
