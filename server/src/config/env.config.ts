import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = ["MONGO_URL"] as const;

for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    throw new Error(`Environment variable ${key} is missing`);
  }
}

