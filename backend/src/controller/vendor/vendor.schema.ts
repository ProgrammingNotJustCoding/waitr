import { z } from "zod";
import { itemSchema } from "../orders/order.schema";

const vendorReviewSchema = z.object({
  rating: z.number().min(1).max(5).int(),
  comment: z.string().min(2).max(1000),
});

export const VendorItemSchema = z.object({
  id: z.string().ulid(),
  name: z.string().min(2).max(100),
  description: z.string().min(2).max(1000),
  imageUrl: z.string().url().min(2).max(1000).optional(),
  price: z.number().min(0),
  isAvailable: z.boolean().default(true),
  isDeleted: z.boolean().default(false),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  deletedAt: z.date().optional().nullable().default(null),
});

export const vendorSchema = z.object({
  id: z.string().ulid().optional(),
  name: z.string().min(2).max(100),
  email: z.string().email().min(2).max(100),
  phone: z.string().min(8).max(12),
  address: z.string().min(2).max(100),
  city: z.string().min(2).max(100).optional(),
  state: z.string().min(2).max(100).optional(),
  pincode: z.string().min(6).max(6).optional(),
  latitude: z.string().min(6).max(6).optional(),
  longitude: z.string().min(6).max(6).optional(),
  website: z.string().url().min(2).optional(),
  userReviews: z.array(vendorReviewSchema).optional(),
  items: z.array(itemSchema).optional(),
  isDeleted: z.boolean().default(false),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  deletedAt: z.date().optional().nullable().default(null),
});

export type VendorType = z.infer<typeof vendorSchema>;
export type VendorItemType = z.infer<typeof VendorItemSchema>;
