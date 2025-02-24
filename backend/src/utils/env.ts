import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z.string().regex(/^\d+$/).optional().default("3030"),
  MONGO_URI: z.string(),
  SECRET: z.string().optional().default("INNOFUSION_KA_HAM"),
});

const parsedSchema = envSchema.parse(process.env);

export type EnvSchemaType = z.infer<typeof envSchema>;

export default {
  NODE_ENV: parsedSchema.NODE_ENV,
  PORT: parsedSchema.PORT,
  MONGO_URI: parsedSchema.MONGO_URI,
  SECRET: parsedSchema.SECRET,
};
