import type { Context } from "hono";
import { userSchema, type UserType } from "./user.schema";
import db from "../../db";
import { BackendError } from "../../utils/errors";

export async function handleCreateUser(c: Context) {
  try {
    const body = await c.req.json();
    const user = await userSchema.parseAsync(body);
    const data = await (await db())
      .collection<UserType>("users")
      .insertOne(user);
    return c.json({ success: true, data });
  } catch (error) {
    throw new BackendError("VALIDATION_ERROR", { details: error });
  }
}

export async function handleGetAllUsers(c: Context) {
  try {
    const users = await (await db())
      .collection<UserType>("users")
      .find({})
      .toArray();
    return c.json({ success: true, data: users });
  } catch (error) {
    throw new BackendError("INTERNAL_ERROR", { details: error });
  }
}

export async function handleGetUserDetails(c: Context) {
  try {
    const userId = c.req.param("user");
    const user = await (await db())
      .collection<UserType>("users")
      .findOne({ userID: userId });
    if (!user) {
      throw new BackendError("NOT_FOUND", { message: "User not found" });
    }
    return c.json({ success: true, data: user });
  } catch (error) {
    throw new BackendError("INTERNAL_ERROR", { details: error });
  }
}

export async function handleUpdateUser(c: Context) {
  try {
    const userId = c.req.param("user");
    const body = await c.req.json();
    const user = await userSchema.parseAsync(body);
    const result = await (await db())
      .collection<UserType>("users")
      .updateOne({ userID: userId }, { $set: user });
    if (result.matchedCount === 0) {
      throw new BackendError("NOT_FOUND", { message: "User not found" });
    }
    return c.json({ success: true, data: result });
  } catch (error) {
    throw new BackendError("VALIDATION_ERROR", { details: error });
  }
}

export async function handleDeleteUser(c: Context) {
  try {
    const userId = c.req.param("user");
    const result = await (await db())
      .collection<UserType>("users")
      .deleteOne({ userID: userId });
    if (result.deletedCount === 0) {
      throw new BackendError("NOT_FOUND", { message: "User not found" });
    }
    return c.json({ success: true, data: result });
  } catch (error) {
    throw new BackendError("INTERNAL_ERROR", { details: error });
  }
}
