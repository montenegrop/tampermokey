(async function () {
  "use strict";

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function simulateTyping(text, textarea) {
    for (let i = 0; i < text.length; i++) {
      textarea.value += text[i];
      let inputEvent = new Event("input", { bubbles: true });
      textarea.dispatchEvent(inputEvent);
      await sleep(500); // Adjust the delay for typing speed
    }

    textarea.value += ".";
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
    textarea.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function simulateKeydownOnButtonClick(button, element, key) {
    button.addEventListener("click", () => {
      const event = new KeyboardEvent("keydown", { key: key });
      element.dispatchEvent(event);
      console.log(`Keydown event for '${key}' dispatched.`);
    });
  }

  console.log("Starting...");

  await sleep(15000);

  console.log("Reached the end of the list");

  const userIds = [17929];
  const successIds = [];

  for (let userId of userIds) {
    try {
      console.log(`Messaging user ID: ${userId}`);

      let messageButton = document.querySelector(
        `.ps-member__actions[data-user-id="${userId}"] .ps-member__action--message`
      );
      if (!messageButton) {
        console.log(`Message button not found for user ID: ${userId}`);
        continue;
      }
      ps_messages.new_message(userId, false, messageButton);

      await sleep(3000);

      let messageTextarea = document.querySelector(
        ".ps-postbox__input.ps-textarea.ps-postbox-textarea.ps-tagging-textarea"
      );

      if (messageTextarea) {
        await simulateTyping("This is a scripted message", messageTextarea);
      } else {
        console.log("Textarea not found.");
      }

      let sendButton = document.querySelector(
        ".ps-btn.ps-btn--sm.ps-btn--action.ps-postbox__action.ps-postbox__action--post.ps-button-action.postbox-submit"
      );
      if (sendButton) {
        sendButton.style.backgroundColor = "green"; // Change background color

        // Simulate keydown event when the send button is clicked
        simulateKeydownOnButtonClick(sendButton, messageTextarea, "a");

        /*
        sendButton.click();
        console.log(`Message sent to user ID: ${userId}`);
        successIds.push(userId);
        */
      } else {
        console.log(`Send button not found for user ID: ${userId}`);
      }

      await sleep(3000);
    } catch (error) {
      console.error(`Error messaging user ID: ${userId}`, error);
    }
  }

  console.log("Finished processing. Success IDs:", successIds);
})();
