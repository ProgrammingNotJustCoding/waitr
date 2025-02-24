import type { Context } from "hono";
import { vendorSchema, type VendorType } from "./vendor.schema";
import db from "../../db";
import { BackendError } from "../../utils/errors";
import { ObjectId } from "mongodb";

export async function handleCreateVendor(c: Context) {
  try {
    const body = await c.req.json();
    const vendor = await vendorSchema.parseAsync(body);
    const data = await (await db())
      .collection<VendorType>("vendors")
      .insertOne(vendor);
    return c.json({ success: true, data });
  } catch (error) {
    throw new BackendError("VALIDATION_ERROR", { details: error });
  }
}

export async function handleGetAllVendors(c: Context) {
  try {
    const vendors = await (await db())
      .collection<VendorType>("vendors")
      .find({ isDeleted: false })
      .toArray();
    return c.json({ success: true, data: vendors });
  } catch (error) {
    throw new BackendError("INTERNAL_ERROR", { details: error });
  }
}

export async function handleGetVendorDetails(c: Context) {
  try {
    const vendorId = c.req.param("vendor");
    const vendor = await (await db())
      .collection<VendorType>("vendors")
      .findOne({ _id: new ObjectId(vendorId), isDeleted: false });
    if (!vendor) {
      throw new BackendError("NOT_FOUND", { message: "Vendor not found" });
    }
    return c.json({ success: true, data: vendor });
  } catch (error) {
    throw new BackendError("INTERNAL_ERROR", { details: error });
  }
}

export async function handleUpdateVendor(c: Context) {
  try {
    const vendorId = c.req.param("vendor");
    const body = await c.req.json();
    const vendor = await vendorSchema.parseAsync(body);
    const result = await (await db())
      .collection<VendorType>("vendors")
      .updateOne({ _id: new ObjectId(vendorId) }, { $set: vendor });
    if (result.matchedCount === 0) {
      throw new BackendError("NOT_FOUND", { message: "Vendor not found" });
    }
    return c.json({ success: true, data: result });
  } catch (error) {
    throw new BackendError("VALIDATION_ERROR", { details: error });
  }
}

export async function handleDeleteVendor(c: Context) {
  try {
    const vendorId = c.req.param("vendor");
    const result = await (await db())
      .collection<VendorType>("vendors")
      .updateOne(
        { _id: new ObjectId(vendorId) },
        { $set: { isDeleted: true, deletedAt: new Date() } },
      );
    if (result.matchedCount === 0) {
      throw new BackendError("NOT_FOUND", { message: "Vendor not found" });
    }
    return c.json({ success: true, data: result });
  } catch (error) {
    throw new BackendError("INTERNAL_ERROR", { details: error });
  }
}
