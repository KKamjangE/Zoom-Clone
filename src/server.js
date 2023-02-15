import http from "http";
import SockeIO from "socket.io";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const httpServer = http.createServer(app); // http 서버
const wsServer = SockeIO(httpServer);

wsServer.on("connection", (socket) => {
  socket.on("enter_room", (msg, done) => {
    console.log(msg);
    setTimeout(() => {
      done();
    }, 10000);
  });
});

// const sockets = [];
// wss.on("connection", (socket) => {
//   sockets.push(socket);

//   socket["nickname"] = "Anon";

//   console.log("Connected to Browser ✅");

//   socket.on("close", () => console.log("Disconnected from the Browser ❌"));

//   socket.on("message", (msg) => {
//     const message = JSON.parse(msg.toString("utf-8"));
//     switch (message.type) {
//       case "new_message":
//         sockets.forEach((aSocket) => {
//           aSocket.send(`${socket.nickname}: ${message.payload}`);
//         });
//         break;
//       case "nickname":
//         socket["nickname"] = message.payload;
//         break;
//     }
//   });
// });

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);
