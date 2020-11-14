const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: 'us-cdbr-east-02.cleardb.com',
    port: 3307,
    user: 'b5be0ab264a220',
    password: 'd1245379',
    database: 'sakila-wibu'
  }
});

module.exports = knex;