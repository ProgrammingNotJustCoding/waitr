import { serve } from "@hono/node-server";
import { Hono } from "hono";
import CONFIG from "./utils/env";
import { BootstrapServer } from "./utils/server";
import wss from "./controller/vendor/websocket";

function main() {
  const app = new Hono();

  BootstrapServer(app);

  const port = Number(CONFIG.PORT);
  console.log(`Server is running on port ${port}`);

  const server = serve({
    fetch: app.fetch,
    port,
  });

  server.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  });
}

main();
