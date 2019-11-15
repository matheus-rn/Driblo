module.exports = {
  dialect: 'postgres',
  host: 'db-driblo',
  username: 'username',
  password: 'pgpassword',
  database: 'dbdriblo',
  operatorAliases: 'false',
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
