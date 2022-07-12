/**
 * @file Manages database connection configuration.
 * @author Fikri Rahmat Nurhidayat
 */

/** Destruct environment variable to get database configuration */
const {
  DB_USERNAME = "lwglnjmbuxpgvs",
  DB_PASSWORD = "7d649ef2210e0b46eeefa8401b2ae2b9a8c9869bd529bdb2de8c5fbf389c9a96",
  DB_HOST = "ec2-3-217-14-181.compute-1.amazonaws.com",
  DB_NAME = "d4vtttg8k8nb8j",
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
