import { ObjectId } from "mongodb";
import { z } from "zod";

const vendorReviewSchema = z.object({
  rating: z.number().min(1).max(5).int(),
  comment: z.string().min(2).max(1000),
});

const objectIdSchema = z.custom<ObjectId>(
  (val) => {
    return ObjectId.isValid(val);
  },
  {
    message: "Invalid ObjectId",
  },
);

export const vendorSchema = z.object({
  id: objectIdSchema.optional(),
  name: z.string().min(2).max(100),
  email: z.string().email().min(2).max(100),
  phone: z.string().min(8).max(12),
  address: z.string().min(2).max(100),
  city: z.string().min(2).max(100),
  state: z.string().min(2).max(100),
  pincode: z.string().min(6).max(6).optional(),
  latitude: z.string().min(6).max(6).optional(),
  longitude: z.string().min(6).max(6).optional(),

  website: z.string().url().min(2).optional(),
  userReviews: z.array(vendorReviewSchema).optional(),

  isDeleted: z.boolean().default(false),

  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  deletedAt: z.date().nullable(),
});

export type VendorType = z.infer<typeof vendorSchema>;
