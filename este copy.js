// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2024-08-27
// @description  try to take over the world!
// @author       You
// @match        https://thegroomhaus.com/members*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=thegroomhaus.com

// ==/UserScript==
(async function () {
  "use strict";
  // 16882
  const userIds = [
    17714, 16011, 17083, 4059, 1974, 4363, 4348, 450, 49, 5759, 15219, 15461,
    15259, 1422, 5830, 15045, 15020, 11529, 5367, 11562, 2749, 2767, 3106, 4213,
    806, 4228, 3903, 3652,
  ];

  const myMessage = `Hey it's Alex – we’re hosting a mobile grooming mastermind this Thursday and wanted to reach out to the GroomHaus community for the last remaining slots.
The panel is grooming business owners with 100+ vans to brand new groomers.
Here’s the event details and RSVP link if you can make it >
https://lu.ma/mobilegroomingmastermind`;

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  let i = 0;
  while (i < 20) {
    i = i + 1;
    console.log("...starting", i.toString());
    await sleep(1000);
  }
  console.log("Starting...");
  await sleep(10000);

  var elementFound = false;

  async function typeMessage(text, textarea) {
    const words = text.split(" ");
    textarea.value = "";
    for (let word of words) {
      textarea.value += word + " ";
      let inputEvent = new Event("input", { bubbles: true });
      textarea.dispatchEvent(inputEvent);
      await sleep(20);
    }
  }

  async function checkRecipientName() {
    let indexx = 0;
    while (indexx < 10) {
      // First, find the parent div with the specific class
      let parentDiv = document.querySelector(
        ".ps-modal.ps-dialog.ps-dialog-wide"
      );

      if (parentDiv) {
        // Now, search for the recipientNameElement within this parent div
        let recipientNameElement = parentDiv.querySelector(
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
          console.log("Recipient name element not found inside the modal.");
        }
      } else {
        console.log("Modal with the specified class not found.");
        indexx = indexx + 1;
        await sleep(1000);
      }
      await sleep(100);
    }
  }

  async function findMessageButton(userId) {
    while (true) {
      let messageButton = document.querySelector(
        `.ps-member__actions[data-user-id="${userId}"] .ps-member__action--message`
      );

      if (messageButton) {
        console.log(`Message button found for user ID: ${userId}`);
        return messageButton;
      } else {
        console.log(
          `Message button not found for user ID: ${userId}. Scrolling down and trying again.`
        );

        window.scrollTo(0, document.body.scrollHeight);
        await sleep(2000);

        let alertElement = document.querySelector(".ps-alert");
        if (
          alertElement &&
          alertElement.innerText.trim() === "Nothing more to show." &&
          alertElement.style.display !== "none"
        ) {
          console.log("No more content to load. Stopping search.");
          return false;
        }
      }
    }
  }

  console.log("Starting...");
  await sleep(10000);

  console.log("Reached the end of the list");

  const successIds = [];
  const failedIds = [];

  // Sobreescribe window.location para evitar redirecciones
  Object.defineProperty(window, "location", {
    configurable: false,
    enumerable: true,
    get: function () {
      return {
        href: window.location.href,
        assign: function () {
          console.log("Intercepted redirect to:", arguments[0]);
        },
        replace: function () {
          console.log("Intercepted replace to:", arguments[0]);
        },
      };
    },
    set: function (value) {
      console.log("Attempted to redirect to:", value);
    },
  });

  for (let userId of userIds) {
    try {
      console.log(`Messaging user ID: ${userId}`);
      await sleep(1000);

      let messageButton = await findMessageButton(userId);

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

      // Properly await checkRecipientName
      await sleep(1200);

      await checkRecipientName();
      if (!elementFound) {
        failedIds.push(userId);
        continue;
      }
      elementFound = false;
      await sleep(100);
      console.log("CONTINUE=====================");

      // Simulate typing the message
      await typeMessage(myMessage, messageTextarea);

      let buttons = document.querySelectorAll("button");
      let sendButton = Array.from(buttons).find(
        (button) => button.textContent.trim() === "Send"
      );
      if (sendButton) {
        sendButton.style.backgroundColor = "red";
        await sleep(1000);

        try {
          // Uncomment the next line to actually click the button

          // prevent redirect

          //
          sendButton.click();
          await sleep(3000);
          successIds.push(userId);
        } catch (error) {
          console.log(error);
          failedIds.push(userId);
        }

        let closeButton = document.querySelector("#cwin_close_btn");
        if (closeButton) {
          await sleep(1000);

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

      await sleep(200);
    } catch (error) {
      failedIds.push(userId);
      console.error(`Error messaging user ID: ${userId}`, error);
    }
    console.log("New ID sent correctly. So far:", successIds);
    console.log("New failed IDs. FF--Soo far :", failedIds);
    await sleep(1000);
  }

  console.log("Finished processing. Success IDs:", successIds);
  console.log("Finished processing. FAILED IDs:", failedIds);
})();
