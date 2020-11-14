const db = require('../utils/db');

module.exports = {
  async singleById(id) {
    const list = await db('users').where('id', id);
    if (list.length === 0) {
      return null;
    }

    return list[0];
  },

  async singleByUserName(userName) {
    const list = await db('users').where('username', userName);
    if (list.length === 0) {
      return null;
    }

    return list[0];
  },

  updateRefreshToken(id, refreshToken) {
    return db('users').where('id', id).update('rfToken', refreshToken);
  },

  async isRefreshTokenExisted(id, refreshToken) {
    const list = await db('users')
      .where('id', id)
      .andWhere('rfToken', refreshToken);

    if (list.length > 0)
      return true;

    return false;
  },

  async add(user) {
    const idList = await db('users')
      .returning('id')
      .insert(user);

    return idList[0];
  }
};
