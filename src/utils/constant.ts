import { config } from "dotenv";
config();

const e = process.env;

export const PORT = e.PORT;
export const DB_NAME = e.DB_NAME;
export const DB_USER = e.DB_USER;
export const DB_PASS = e.DB_PASS;
export const DB_PORT = e.DB_PORT;
export const DEFAULT_MESSAGE = `Server Sedang Berjalan di http://localhost:${PORT}`;
export const ERROR_MESSAGE = "Mohon Maaf server sedang Error";
