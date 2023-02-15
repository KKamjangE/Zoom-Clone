const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nick");
const socket = new WebSocket(`ws://${window.location.host}`);

const makeMessage = (type, payload) => {
  const msg = { type, payload };
  return JSON.stringify(msg);
};

socket.addEventListener("open", () => {
  // 연결 성공 시
  console.log("Connected to Server ✅");
});

socket.addEventListener("message", (message) => {
  // 화면에 메세지 li태그로 만들기
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});

socket.addEventListener("close", () => {
  // 서버가 오프라인이 될 때
  console.log("Disconnected from the Server ❌");
});

messageForm.addEventListener("submit", (event) => {
  // 서버로 메세지 보내기
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeMessage("new_message", input.value));
  input.value = "";
});

nickForm.addEventListener("submit", (event) => {
  // 서버로 닉네임 보내기
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
  input.value = "";
});
