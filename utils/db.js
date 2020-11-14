const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: 'us-cdbr-east-02.cleardb.com',
    port: 3306,
    user: 'b5be0ab264a220',
    password: 'd1245379',
    database: 'heroku_c2535df968a4d9a'
  }
});

module.exports = knex;