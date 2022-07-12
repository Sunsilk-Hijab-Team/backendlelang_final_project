/**
 * @file Manages database connection configuration.
 * @author Fikri Rahmat Nurhidayat
 */

/** Destruct environment variable to get database configuration */
const {
  DB_USERNAME = "avmceybcqbfkvu",
  DB_PASSWORD = "f97e51dab27d5b4cca8e0be868b37a0a43776bf33d15820022eb5a1cc05f444b",
  DB_HOST = "ec2-3-223-169-166.compute-1.amazonaws.com",
  DB_NAME = "d7ion06unri46j",
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
    dialectOptions: {
      ssl: true,
    },
    dialect: "postgres",
  },
};
