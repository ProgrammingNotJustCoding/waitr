import { Hono } from "hono";
import vendorRouter from "./vendor.routes";
import userRouter from "./user.routes";
import orderRouter from "./order.routes";

const appRouter = new Hono();

appRouter.get("/", (c) => {
  return c.text("Hello World!");
});

appRouter.route("/vendor", vendorRouter);
appRouter.route("/order", orderRouter);
appRouter.route("/user", userRouter);

export default appRouter;
