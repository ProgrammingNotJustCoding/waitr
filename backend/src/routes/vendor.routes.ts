import { Hono } from "hono";
import {
  handleCreateVendor,
  handleCreateVendorItem,
  handleDeleteVendor,
  handleDeleteVendorItem,
  handleGetAllVendors,
  handleGetVendorDetails,
  handleGetVendorItems,
  handleUpdateVendor,
  handleUpdateVendorItem,
} from "../controller/vendor/vendor.controller";

const vendorRouter = new Hono();

vendorRouter.post("/new", handleCreateVendor);
vendorRouter.get("/", handleGetAllVendors);
vendorRouter.get("/:vendor", handleGetVendorDetails);
vendorRouter.put("/:vendor", handleUpdateVendor);
vendorRouter.delete("/:vendor", handleDeleteVendor);

vendorRouter.post("/:vendor/items/new", handleCreateVendorItem);
vendorRouter.get("/:vendor/items", handleGetVendorItems);
vendorRouter.put("/:vendor/items/:item", handleUpdateVendorItem);
vendorRouter.delete("/:vendor/items/:item", handleDeleteVendorItem);

export default vendorRouter;
