const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  // 연결 성공 시
  console.log("Connected to Server ✅");
});

socket.addEventListener("message", (message) => {
  // 메세지를 받았을 시
  console.log("New message: ", message.data);
});

socket.addEventListener("close", () => {
  // 서버가 오프라인이 될 때
  console.log("Disconnected from the Server ❌");
});

setTimeout(() => {
  socket.send("hello from the browser!");
}, 10000);
