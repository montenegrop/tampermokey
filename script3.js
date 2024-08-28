(async function () {
  "use strict";

  const myMessage = `Hey it's Alex – we’re hosting a mobile grooming mastermind this Thursday and wanted to reach out to the GroomHaus community for the last remaining slots.
The panel is grooming business owners with 100+ vans to brand new groomers.
Here’s the event details and RSVP link if you can make it >
https://lu.ma/mobilegroomingmastermind`;

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  var elementFound = false;

  async function typeMessage(text, textarea) {
    const words = text.split(" ");
    textarea.value = ""; // Clear the textarea initially
    for (let word of words) {
      textarea.value += word + " ";
      let inputEvent = new Event("input", { bubbles: true });
      textarea.dispatchEvent(inputEvent);
      await sleep(300); // Adjust the delay for typing speed
    }
  }

  async function checkRecipientName() {
    while (true) {
      let recipientNameElement = document.querySelector(
        ".ps-message__recipient-name.ps-comment-user"
      );

      if (recipientNameElement) {
        let content = recipientNameElement.textContent.trim();

        if (content) {
          console.log("Element exists and has content:", content);
          await sleep(800);
          elementFound = true;
          break;
        } else {
          console.log("Element exists but has no content.");
        }
      } else {
        console.log("Element not found.");
      }
      await sleep(100);
    }
  }

  console.log("Starting...");
  await sleep(10000);

  console.log("Reached the end of the list");

  const userIds = ["17873"];
  const successIds = [];
  const failedIds = [];

  for (let userId of userIds) {
    try {
      console.log(`Messaging user ID: ${userId}`);

      let messageButton = document.querySelector(
        `.ps-member__actions[data-user-id="${userId}"] .ps-member__action--message`
      );
      if (!messageButton) {
        console.log(`Message button not found for user ID: ${userId}`);
        failedIds.push(userId);
        continue;
      }
      ps_messages.new_message(userId, false, messageButton);

      let messageTextarea = document.querySelector(
        ".ps-postbox__input.ps-textarea.ps-postbox-textarea.ps-tagging-textarea"
      );
      if (!messageTextarea) {
        console.log(`Message textarea not found for user ID: ${userId}`);
        continue;
      }

      //// Properly await checkRecipientName
      //   await checkRecipientName();

      //   while (!elementFound) {
      //     console.log("zzzz.");
      //     await sleep(100);
      //   }
      console.log("10S");

      await sleep(10000);

      console.log("CONTINUE=====================");
      elementFound = false;

      // Simulate typing the message
      await typeMessage(myMessage, messageTextarea);

      let buttons = document.querySelectorAll("button");
      let sendButton = Array.from(buttons).find(
        (button) => button.textContent.trim() === "Send"
      );
      if (sendButton) {
        sendButton.style.backgroundColor = "red";
        await sleep(3000);

        try {
          // Uncomment the next line to actually click the button
          // sendButton.click();
          await sleep(3000);
          successIds.push(userId);
        } catch (error) {
          failedIds.push(userId);
        }

        let closeButton = document.querySelector("#cwin_close_btn");
        if (closeButton) {
          await sleep(5000);
          closeButton.click();
          console.log("Close button clicked.");
        } else {
          failedIds.push(userId);
          console.log("Close button not found.");
        }
      } else {
        failedIds.push(userId);
        console.log(`Send button not found for user ID: ${userId}`);
      }

      await sleep(3000);
    } catch (error) {
      failedIds.push(userId);
      console.error(`Error messaging user ID: ${userId}`, error);
    }
    console.log("New ID sent correctly. So far:", successIds);
    console.log("New failed IDs. FF--Soo far :", failedIds);
  }
  await sleep(3000);

  console.log("Finished processing. Success IDs:", successIds);
  console.log("Finished processing. FAILED IDs:", failedIds);
  await sleep(3000);
})();
