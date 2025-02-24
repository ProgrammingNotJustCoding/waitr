import { Hono } from "hono";
import vendorRouter from "./vendor.routes";

const appRouter = new Hono();

appRouter.get("/", (c) => {
  return c.text("Hello World!");
});

appRouter.route("/vendor", vendorRouter);

export default appRouter;
