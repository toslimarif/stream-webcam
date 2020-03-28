const http = require("http");
const WebSocket = require("ws");
const app = require("./app");

const httpServer = http.createServer(app);

const PORT = process.env.PORT || 3000;

const wsServer = new WebSocket.Server({ server: httpServer }, () =>
  console.log(`WS server is listening at ws://localhost:${WS_PORT}`)
);

// array of connected websocket clients
const connectedClients = [];

wsServer.on("connection", (ws, req) => {
  console.log("Connected");
  // add new connected client
  connectedClients.push(ws);
  // listen for messages from the streamer, the clients will not send anything so we don't need to filter
  ws.on("message", data => {
    // send the base64 encoded frame to each connected ws
    connectedClients.forEach((ws, i) => {
      if (ws.readyState === ws.OPEN) {
        // check if it is still connected
        ws.send(data); // send
      } else {
        // if it's not connected remove from the array of connected ws
        connectedClients.splice(i, 1);
      }
    });
  });
});

httpServer.listen(PORT, () =>
  console.log(`HTTP server listening at port ${PORT}`)
);
