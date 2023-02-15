import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app); // http 서버
const wss = new WebSocket.Server({ server }); // webSocket 서버

const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);

  socket["nickname"] = "Anon";

  console.log("Connected to Browser ✅");

  socket.on("close", () => console.log("Disconnected from the Browser ❌"));

  socket.on("message", (msg) => {
    const message = JSON.parse(msg.toString("utf-8"));
    switch (message.type) {
      case "new_message":
        sockets.forEach((aSocket) => {
          aSocket.send(`${socket.nickname}: ${message.payload}`);
        });
        break;
      case "nickname":
        socket["nickname"] = message.payload;
        break;
    }
  });
});

server.listen(3000, handleListen);
