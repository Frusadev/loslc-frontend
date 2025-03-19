import dotenv from "dotenv";

dotenv.config();

export const SERVER_URL = process.env.SERVER_URL || "http://localhost:8000";
export const API_VERSION = process.env.API_VERSION || "v1";
