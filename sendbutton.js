let buttons = document.querySelectorAll("button");
let sendButton = Array.from(buttons).find(
  (button) => button.textContent.trim() === "Send"
);
if (sendButton) {
  sendButton.style.backgroundColor = "red";
  console.log("Background color changed to red");
} else {
  console.log("Send button not found.");
}
