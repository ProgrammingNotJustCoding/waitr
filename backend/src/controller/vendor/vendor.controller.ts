import type { Context } from "hono";
import {
  VendorItemSchema,
  vendorSchema,
  type VendorType,
} from "./vendor.schema";
import db from "../../db";
import { BackendError } from "../../utils/errors";
import { ZodError } from "zod";
import { ulid } from "ulid";

export async function handleCreateVendor(c: Context) {
  try {
    const body = await c.req.json();
    const vendor = await vendorSchema.parseAsync(body);
    const data = await (await db())
      .collection<VendorType>("vendors")
      .insertOne(vendor);
    return c.json({ success: true, data });
  } catch (error) {
    if (error instanceof ZodError) {
      throw new BackendError("VALIDATION_ERROR", { details: error });
    }
    throw new BackendError("INTERNAL_ERROR", { details: error });
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
    if (error instanceof ZodError) {
      throw new BackendError("VALIDATION_ERROR", { details: error });
    }
    throw new BackendError("INTERNAL_ERROR", { details: error });
  }
}

export async function handleGetVendorDetails(c: Context) {
  try {
    const vendorId = c.req.param("vendor");
    const vendor = await (await db())
      .collection<VendorType>("vendors")
      .findOne({ id: vendorId, isDeleted: false });
    if (!vendor) {
      throw new BackendError("NOT_FOUND", { message: "Vendor not found" });
    }
    return c.json({ success: true, data: vendor });
  } catch (error) {
    if (error instanceof ZodError) {
      throw new BackendError("VALIDATION_ERROR", { details: error });
    }
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
      .updateOne({ id: vendorId }, { $set: vendor });
    if (result.matchedCount === 0) {
      throw new BackendError("NOT_FOUND", { message: "Vendor not found" });
    }
    return c.json({ success: true, data: result });
  } catch (error) {
    if (error instanceof ZodError) {
      throw new BackendError("VALIDATION_ERROR", { details: error });
    }
    throw new BackendError("INTERNAL_ERROR", { details: error });
  }
}

export async function handleDeleteVendor(c: Context) {
  try {
    const vendorId = c.req.param("vendor");
    const result = await (await db())
      .collection<VendorType>("vendors")
      .updateOne(
        { id: vendorId },
        { $set: { isDeleted: true, deletedAt: new Date() } },
      );
    if (result.matchedCount === 0) {
      throw new BackendError("NOT_FOUND", { message: "Vendor not found" });
    }
    return c.json({ success: true, data: result });
  } catch (error) {
    if (error instanceof ZodError) {
      throw new BackendError("VALIDATION_ERROR", { details: error });
    }
    throw new BackendError("INTERNAL_ERROR", { details: error });
  }
}

export async function handleCreateVendorItem(c: Context) {
  try {
    const vendorId = c.req.param("vendor");
    const body = await c.req.json();
    const item = await VendorItemSchema.parseAsync(body);
    item.id = ulid();

    const vendor = await (await db())
      .collection("vendors")
      .findOne({ id: vendorId, isDeleted: false });
    if (!vendor) {
      throw new BackendError("NOT_FOUND", { message: "Vendor not found" });
    }

    const vendorItems = vendor.items || [];
    vendorItems.push(item);

    await (await db())
      .collection("vendors")
      .updateOne({ id: vendorId }, { $set: { items: vendorItems } });

    return c.json({ success: true, data: item });
  } catch (error) {
    if (error instanceof ZodError) {
      throw new BackendError("VALIDATION_ERROR", { details: error });
    }
    throw new BackendError("INTERNAL_ERROR", { details: error });
  }
}

export async function handleGetVendorItems(c: Context) {
  try {
    const vendorId = c.req.param("vendor");
    const vendor = await (await db())
      .collection("vendors")
      .findOne({ id: vendorId, isDeleted: false });
    if (!vendor) {
      throw new BackendError("NOT_FOUND", { message: "Vendor not found" });
    }
    return c.json({ success: true, data: vendor.items });
  } catch (error) {
    if (error instanceof ZodError) {
      throw new BackendError("VALIDATION_ERROR", { details: error });
    }
    throw new BackendError("INTERNAL_ERROR", { details: error });
  }
}

export async function handleGetAllVendorItems(c: Context) {
  try {
    const vendorId = c.req.param("vendor");
    const vendor = await (await db())
      .collection("vendors")
      .findOne({ id: vendorId, isDeleted: false });
    if (!vendor) {
      throw new BackendError("NOT_FOUND", { message: "Vendor not found" });
    }
    return c.json({ success: true, data: vendor.items });
  } catch (error) {
    if (error instanceof ZodError) {
      throw new BackendError("VALIDATION_ERROR", { details: error });
    }
    throw new BackendError("INTERNAL_ERROR", { details: error });
  }
}

export async function handleUpdateVendorItem(c: Context) {
  try {
    const vendorId = c.req.param("vendor");
    const itemId = c.req.param("item");
    const body = await c.req.json();
    const item = await VendorItemSchema.parseAsync(body);
    const result = await (await db())
      .collection("vendors")
      .updateOne(
        { id: vendorId, "items.id": itemId },
        { $set: { "items.$": item } },
      );
    if (result.matchedCount === 0) {
      throw new BackendError("NOT_FOUND", {
        message: "Vendor or item not found",
      });
    }
    return c.json({ success: true, data: item });
  } catch (error) {
    if (error instanceof ZodError) {
      throw new BackendError("VALIDATION_ERROR", { details: error });
    }
    throw new BackendError("INTERNAL_ERROR", { details: error });
  }
}
