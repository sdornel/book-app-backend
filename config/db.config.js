module.exports = {
    HOST: "localhost",
    USER: "kaidornel",
    PASSWORD: "123",
    DB: "book-db-dev-2",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };