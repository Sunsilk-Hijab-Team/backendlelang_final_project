/**
 * @file Manages database connection configuration.
 * @author Fikri Rahmat Nurhidayat
 */

/** Destruct environment variable to get database configuration */
const {
  DB_USERNAME = "avmceybcqbfkvu",
  DB_PASSWORD = "f97e51dab27d5b4cca8e0be868b37a0a43776bf33d15820022eb5a1cc05f444b",
  DB_HOST = "127.0.0.1",
  DB_NAME = "d7ion06unri46j",
  DB_PORT = "5432"
} = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_NAME}_development`,
    host: DB_HOST,
    dialect: "postgres",
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_NAME}_test`,
    host: DB_HOST,
    dialect: "postgres",
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    dialectOptions: {
      ssl: true,
    }
  },
};
