const db = require('../utils/db');

module.exports = {
  getAll() {
    return db('film');
  },

  async singleById(id) {
    const list = await db('film').where('film_id', id);
    if (list.length === 0) {
      return null;
    }

    return list[0];
  },

  add(film) {
    return db('film')
      .returning('film_id')
      .insert(film);
  }
};
