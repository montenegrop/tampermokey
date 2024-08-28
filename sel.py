from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

# Set up the webdriver
driver = webdriver.Chrome(executable_path="/path/to/chromedriver")

# Navigate to the webpage
driver.get("https://yourwebsite.com/users")

# Get the list of users (based on the class or another identifier)
users = driver.find_elements(By.CLASS_NAME, "ps-member")

# Loop through each user and send a message
for user in users:
    try:
        # Click on the message button for the user
        message_button = user.find_element(By.CLASS_NAME, "ps-member__action--message")
        message_button.click()

        # Wait for the chat window to open
        time.sleep(2)

        # Find the chat input box
        chat_input = driver.find_element(
            By.CLASS_NAME, "chat-input-selector"
        )  # Replace with actual selector

        # Type the message
        chat_input.send_keys("Hello, this is an automated message.")

        # Send the message (could be pressing Enter or clicking a send button)
        chat_input.send_keys(Keys.RETURN)

        # Wait for the message to send
        time.sleep(1)

        # Close the chat window (optional)
        close_button = driver.find_element(
            By.CLASS_NAME, "close-chat-selector"
        )  # Replace with actual selector
        close_button.click()

    except Exception as e:
        print(f"Failed to send message to user: {e}")

# Close the browser
driver.quit()
