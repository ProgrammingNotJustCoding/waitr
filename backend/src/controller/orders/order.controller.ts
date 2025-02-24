import type { Context } from "hono";
import { orderSchema, type OrderType } from "./order.schema";
import db from "../../db";
import { BackendError } from "../../utils/errors";
import { ObjectId } from "mongodb";

export async function handleCreateOrder(c: Context) {
  try {
    const body = await c.req.json();
    const order = await orderSchema.parseAsync(body);
    const data = await (await db())
      .collection<OrderType>("orders")
      .insertOne(order);
    return c.json({ success: true, data });
  } catch (error) {
    throw new BackendError("VALIDATION_ERROR", { details: error });
  }
}

export async function handleGetAllOrders(c: Context) {
  try {
    const orders = await (await db())
      .collection<OrderType>("orders")
      .find({})
      .toArray();
    return c.json({ success: true, data: orders });
  } catch (error) {
    throw new BackendError("INTERNAL_ERROR", { details: error });
  }
}

export async function handleGetOrderDetails(c: Context) {
  try {
    const orderId = c.req.param("order");
    const order = await (await db())
      .collection<OrderType>("orders")
      .findOne({ _id: new ObjectId(orderId) });
    if (!order) {
      throw new BackendError("NOT_FOUND", { message: "Order not found" });
    }
    return c.json({ success: true, data: order });
  } catch (error) {
    throw new BackendError("INTERNAL_ERROR", { details: error });
  }
}

export async function handleUpdateOrder(c: Context) {
  try {
    const orderId = c.req.param("order");
    const body = await c.req.json();
    const order = await orderSchema.parseAsync(body);
    const result = await (await db())
      .collection<OrderType>("orders")
      .updateOne({ _id: new ObjectId(orderId) }, { $set: order });
    if (result.matchedCount === 0) {
      throw new BackendError("NOT_FOUND", { message: "Order not found" });
    }
    return c.json({ success: true, data: result });
  } catch (error) {
    throw new BackendError("VALIDATION_ERROR", { details: error });
  }
}

export async function handleDeleteOrder(c: Context) {
  try {
    const orderId = c.req.param("order");
    const result = await (await db())
      .collection<OrderType>("orders")
      .deleteOne({ _id: new ObjectId(orderId) });
    if (result.deletedCount === 0) {
      throw new BackendError("NOT_FOUND", { message: "Order not found" });
    }
    return c.json({ success: true, data: result });
  } catch (error) {
    throw new BackendError("INTERNAL_ERROR", { details: error });
  }
}
