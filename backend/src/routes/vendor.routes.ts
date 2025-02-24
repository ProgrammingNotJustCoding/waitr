import { Hono } from "hono";
import {
  handleCreateVendor,
  handleCreateVendorItem,
  handleDeleteVendor,
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

vendorRouter.get("/ws", (c) => {
  const { response } = c;
  response.headers.set("Upgrade", "websocket");
  response.headers.set("Connection", "Upgrade");
  response.status = 101;
  return response;
});

export default vendorRouter;
