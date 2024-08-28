(async function () {
  "use strict";

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function typeMessage(text, textarea) {
    const words = text.split(" ");
    textarea.value = ""; // Clear the textarea initially
    for (let word of words) {
      textarea.value += word + " ";
      let inputEvent = new Event("input", { bubbles: true });
      textarea.dispatchEvent(inputEvent);
      await sleep(100); // Adjust the delay for typing speed
    }
  }

  console.log("Starting...");

  //   while (true) {
  // let alertElement = document.querySelector(".ps-alert");
  // if (
  //   alertElement &&
  //   alertElement.innerText.trim() === "Nothing more to show." &&
  //   alertElement.style.display !== "none"
  // ) {
  //   break;
  // }
  //     window.scrollTo(0, document.body.scrollHeight);
  //     await sleep(2000);
  //   }
  await sleep(15000);

  console.log("Reached the end of the list");

  const userIds = [17929, 17929, 17929, 17929, 17929];
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

      await sleep(2000);

      let messageTextarea = document.querySelector(
        ".ps-postbox__input.ps-textarea.ps-postbox-textarea.ps-tagging-textarea"
      );
      if (!messageTextarea) {
        console.log(`Message textarea not found for user ID: ${userId}`);
        continue;
      }

      // Simulate typing the message
      await typeMessage("This is a scripted message.", messageTextarea);

      let buttons = document.querySelectorAll("button");
      let sendButton = Array.from(buttons).find(
        (button) => button.textContent.trim() === "Send"
      );
      if (sendButton) {
        sendButton.style.backgroundColor = "red";

        let closeButton = document.querySelector("#cwin_close_btn");
        if (closeButton) {
          closeButton.click();
          console.log("Close button clicked.");
        } else {
          console.log("Close button not found.");
        }

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
