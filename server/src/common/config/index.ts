import * as dotenv from 'dotenv';

dotenv.config();

const {
  PORT,
  NODE_ENV,
  MONGODB_URI,
  ACCESS_SECRET,
  ACCESS_EXPIRE_IN,
  REFRESH_SECRET,
  REFRESH_EXPIRE_IN,
  MAIL_SECRET,
  MAIL_EXPIRE_IN,
} = process.env;

export const GENERAL_CONFIG = {
  PORT: parseInt(PORT),
  NODE_ENV,
  MONGODB_URI,
};

export const JWT_CONFIG = {
  ACCESS_SECRET,
  ACCESS_EXPIRE_IN,
  REFRESH_SECRET,
  REFRESH_EXPIRE_IN,
  MAIL_SECRET,
  MAIL_EXPIRE_IN,
};
