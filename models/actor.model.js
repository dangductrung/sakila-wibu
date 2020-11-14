const { update } = require('../utils/db');
const db = require('../utils/db');

module.exports = {
  getAll() {
    return db('actor');
  },
  async singleById(id) {
    const list = await db('actor').where('actor_id', id);
    if (list.length === 0) {
      return null;
    }
    return list[0];
  },
  add(actor) {
    return db('actor')
      .returning('actor_id')
      .insert(actor);
  },
  async delete(actor) {
    //must delete actor in film actor, foreign key actor_id
    await db('film_actor')
      .where('actor_id', actor)
      .del();

    return db('actor').where('actor_id', actor).del();
  },
  update(actor, body) {
    return db('actor')
      .where({ actor_id: actor })
      .update({
        first_name: body.first_name,
        last_name: body.last_name
      })
  }
};
