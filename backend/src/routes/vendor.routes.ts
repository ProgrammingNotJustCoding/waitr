import { Hono } from "hono";
import {
  handleCreateVendor,
  handleDeleteVendor,
  handleGetAllVendors,
  handleGetVendorDetails,
  handleUpdateVendor,
} from "../controller/vendor/vendor.controller";

const vendorRouter = new Hono();

vendorRouter.post("/new", handleCreateVendor);
vendorRouter.get("/", handleGetAllVendors);
vendorRouter.get("/:vendor", handleGetVendorDetails);
vendorRouter.put("/:vendor", handleUpdateVendor);
vendorRouter.delete("/:vendor", handleDeleteVendor);

export default vendorRouter;
