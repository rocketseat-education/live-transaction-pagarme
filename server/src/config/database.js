module.exports = {
  connection: 'pg',

  pg: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: '5432',
      user: 'docker',
      password: 'docker',
      database: 'rocketstore',
    },
    //debug: true,
  },
};
