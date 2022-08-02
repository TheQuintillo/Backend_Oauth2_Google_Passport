/* eslint-disable prefer-destructuring */
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

const env = dotenv.config();
dotenvExpand.expand(env);

export const PORT = process.env.PORT;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const SESSION_AUTH_GOOGLE = process.env.SESSION_AUTH_GOOGLE;
export const JWT_TOKEN = process.env.JWT_TOKEN;
export const ENCRYPT_TOKEN = process.env.ENCRYPT_TOKEN;
export const MAILER_EMAIL = process.env.MAILER_EMAIL;
export const MAILER_PASSWORD = process.env.MAILER_PASSWORD;

export const DATABASE_URL = process.env.DATABASE_URL;
export const DATABASE_URL_WITH_SCHEMA = process.env.DATABASE_URL_WITH_SCHEMA;
