import { z } from "zod";

import { ObjectId } from "mongodb";

const objectIdSchema = z.custom<ObjectId>(
  (val) => {
    return ObjectId.isValid(val);
  },
  {
    message: "Invalid ObjectId",
  },
);

export const userSchema = z.object({
  id: objectIdSchema.optional(),
  userID: z.string().uuid(),
  userEmail: z.string().email(),

  userOrder: z.array(z.string()),
});

export type UserType = z.infer<typeof userSchema>;
