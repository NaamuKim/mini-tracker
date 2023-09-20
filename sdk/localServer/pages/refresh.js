const ws = new WebSocket("ws://localhost:3000");

ws.addEventListener("message", (event) => {
  if (event.data === "refresh") {
    location.reload();
  }
});
