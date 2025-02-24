import { Hono } from "hono";
import {
  handleCreateOrder,
  handleDeleteOrder,
  handleGetAllOrders,
  handleGetOrderDetails,
  handleNewItem,
  handleUpdateOrder,
} from "../controller/orders/order.controller";

const orderRouter = new Hono();

orderRouter.post("/new", handleCreateOrder);
orderRouter.post("/:order/newitem", handleNewItem);
orderRouter.get("/", handleGetAllOrders);
orderRouter.get("/:order", handleGetOrderDetails);
orderRouter.put("/:order", handleUpdateOrder);
orderRouter.delete("/:order", handleDeleteOrder);

export default orderRouter;
