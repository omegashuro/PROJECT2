module.exports = {
    HOST: "35.193.151.189",
    USER: "root",
    PASSWORD: "1234",
    DB: "albumdatabase",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };