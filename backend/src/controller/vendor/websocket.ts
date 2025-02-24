import { WebSocketServer } from "ws";
import db from "../../db/index";
import type { OrderType } from "../orders/order.schema";

const wss = new WebSocketServer({ noServer: true });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", async (message) => {
    try {
      const parsedMessage = JSON.parse(message.toString());
      console.log("Received message =>", parsedMessage);
    } catch (error) {
      console.error("Failed to parse message", error);
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

export async function notifyNewOrder(order: OrderType) {
  const vendorId = order.vendorID;
  const vendor = await (await db())
    .collection("vendors")
    .findOne({ id: vendorId, isDeleted: false });

  if (vendor) {
    for (const client of wss.clients) {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify({ type: "NEW_ORDER", data: order }));
      }
    }
  }
}

export default wss;
