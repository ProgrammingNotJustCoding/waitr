import { Hono } from "hono";
import {
  handleCreateOrder,
  handleDeleteOrder,
  handleGetAllOrders,
  handleGetOrderDetails,
  handleUpdateOrder,
} from "../controller/orders/order.controller";

const orderRouter = new Hono();

orderRouter.post("/new", handleCreateOrder);
orderRouter.get("/", handleGetAllOrders);
orderRouter.get("/:order", handleGetOrderDetails);
orderRouter.put("/:order", handleUpdateOrder);
orderRouter.delete("/:order", handleDeleteOrder);

export default orderRouter;
