import { z } from "zod";

export const itemSchema = z.object({
  itemID: z.string(),
  itemName: z.string().min(2).max(100),
  quantity: z.number().min(1),
  pricePerUnit: z.number().min(0),
  note: z.string().optional().default(""),
});

export const orderSchema = z.object({
  id: z.string().ulid().optional(),
  vendorID: z.string().ulid().optional(),
  tableID: z.string().uuid(),
  orderID: z.string().ulid(),
  orderItems: z.array(itemSchema).min(1),
  isPriceCalculated: z.boolean().default(false),
  orderPrice: z.number().min(0).optional().default(0),
  isPaid: z.boolean().default(false),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
  deletedAt: z.date().optional().nullable().default(null),
});

export type itemType = z.infer<typeof itemSchema>;
export type OrderType = z.infer<typeof orderSchema>;
