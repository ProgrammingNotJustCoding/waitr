import { z } from "zod";
import { objectIdSchema } from "../vendor/vendor.schema";

export const userSchema = z.object({
  id: objectIdSchema.optional(),
  userID: z.string().uuid(),
  userEmail: z.string().email(),

  userOrder: z.array(z.string()),
});

export type UserType = z.infer<typeof userSchema>;
