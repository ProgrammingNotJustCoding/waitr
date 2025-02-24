import { z } from "zod";
import { objectIdSchema } from "../vendor/vendor.schema";

export const itemSchema = z.object({
  itemID: z.string().ulid(),
  itemName: z.string().min(2).max(100),
  quantity: z.number().min(1),
  pricePerUnit: z.number().min(0),
});

export const orderSchema = z.object({
  id: objectIdSchema.optional(),
  orderID: z.string().ulid(),
  orderItems: z.array(itemSchema).min(1),

  isPriceCalculated: z.boolean().default(false),
  orderPrice: z.number().min(0),

  isPaid: z.boolean().default(false),

  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
  deletedAt: z.date().nullable().default(null),
});

export type itemType = z.infer<typeof itemSchema>;
export type OrderType = z.infer<typeof orderSchema>;
