import { z } from "zod";

export const userSchema = z.object({
  id: z.string().ulid().optional(),
  userID: z.string().uuid(),
  userEmail: z.string().email(),
  userOrder: z.array(z.string()),
});

export type UserType = z.infer<typeof userSchema>;
