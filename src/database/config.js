import 'dotenv/config';

const {
  DB_HOST, DB_NAME, DB_USER, DB_PASSWORD,
} = process.env;

const defaultConfig = {
  dialect: 'mysql',
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  host: DB_HOST,
};

export const development = {
  ...defaultConfig,
};

export const test = {
  ...defaultConfig,
  logging: false,
};

export const production = {
  ...defaultConfig,
  logging: false,
};
