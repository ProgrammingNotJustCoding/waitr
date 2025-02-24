import type { Context } from "hono";
import { itemSchema, orderSchema, type OrderType } from "./order.schema";
import db from "../../db";
import { BackendError } from "../../utils/errors";
import { notifyNewOrder } from "../vendor/websocket";

export async function handleCreateOrder(c: Context) {
  try {
    const body = await c.req.json();
    const order = await orderSchema.parseAsync(body);
    const data = await (await db())
      .collection<OrderType>("orders")
      .insertOne(order);

    await notifyNewOrder(order);

    return c.json({ success: true, data });
  } catch (error) {
    throw new BackendError("VALIDATION_ERROR", { details: error });
  }
}

export async function handleNewItem(c: Context) {
  const orderId = c.req.param("order");
  const body = await c.req.json();
  const item = await itemSchema.parseAsync(body);

  const order = await (await db())
    .collection<OrderType>("orders")
    .findOne({ orderID: orderId });

  if (!order) {
    throw new BackendError("NOT_FOUND", { message: "Order not found" });
  }

  if (!order.orderItems) {
    order.orderItems = [];
  }

  const existingItem = order.orderItems.find(
    (i) => i.itemName === item.itemName,
  );

  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    order.orderItems.push(item);
  }

  await (await db())
    .collection<OrderType>("orders")
    .updateOne(
      { orderID: orderId },
      { $set: { orderItems: order.orderItems } },
    );

  await notifyNewOrder(order);

  return c.json({ success: true, data: order });
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
      .findOne({ orderID: orderId });
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
      .updateOne({ orderID: orderId }, { $set: order });
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
      .deleteOne({ orderID: orderId });
    if (result.deletedCount === 0) {
      throw new BackendError("NOT_FOUND", { message: "Order not found" });
    }
    return c.json({ success: true, data: result });
  } catch (error) {
    throw new BackendError("INTERNAL_ERROR", { details: error });
  }
}
