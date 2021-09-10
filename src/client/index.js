const ADDRESS = "http://localhost:8080";
const socket = io.connect(ADDRESS);

socket.on("messages", (messages) => {
  render(messages);
  window.scrollTo(0, document.body.scrollHeight);
});

const render = (messages) => {
  const html = messages
    .map((message) => {
      return `<li>
        <strong>${message.author}</strong>:
        <em>${message.text}</em>
        </li>`;
    })
    .join(" ");
  document.getElementById("messages").innerHTML = html;
  document.getElementById("text").value = "";
};

const addMessage = (_) => {
  const message = {
    author: document.getElementById("username").value,
    text: document.getElementById("text").value,
  };
  socket.emit("new-message", message);
  return false;
};
