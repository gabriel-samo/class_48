import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const connectedClients = new Map();

const app = new Application();
const port = 3000;
const router = new Router();

//send message to all connected clients
function broadcast(message) {
  for (const client of connectedClients.values()) {
    client.send(message);
  }
}

router.get("/start_web_socket", async (context) => {
  const socket = await context.upgrade();

  socket.onopen = () => {};

  socket.onclose = () => {};

  //broadcast new message if someone sent one
  socket.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    switch (data.event) {
      case "send-message":
        broadcast(
          JSON.stringify({
            event: "send-message",
            username: socket.username,
            message: data.message
          })
        );
        break;
    }
  };
});

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (context) => {
  await context.send({
    root: `${Deno.cwd()}/`,
    index: "public/index.html"
  });
});

console.log("listing at http://localhost:" + port);
await app.listen({ port });
