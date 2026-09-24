import fs from "node:fs";
import path from "node:path";

// Native Node.js .env loading without external dependencies
const envPath = path.resolve(process.cwd(), ".env");
if (fs.existsSync(envPath) && typeof process.loadEnvFile === "function") {
  try {
    process.loadEnvFile(envPath);
  } catch (err) {
    console.warn("Notice: Could not load .env file:", err.message);
  }
}

export const config = {
  port: Number(process.env.PORT) || 5000,
  mongodbUri:
    process.env.MONGODB_URI || "mongodb://localhost:27017/Food_pre-order",
  jwtSecret:
    process.env.JWT_SECRET || "preorder_system_secure_jwt_secret_key_2026",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1d",
  nodeEnv: process.env.NODE_ENV || "development"
};

export default config;
