if (currentForm) {
  currentForm.style.backgroundColor = "blue";

  // Add an event listener for form submission
  currentForm.addEventListener("submit", function (event) {
    console.log(event);

    event.preventDefault();
    const formData = new FormData(currentForm);
    fetch(currentForm.action, {
      method: currentForm.method,
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Or response.text() depending on your needs
      })
      .then((data) => {
        console.log("Mensaje enviado exitosamente:", data);
      })
      .catch((error) => {
        console.error("Error al enviar el mensaje:", error);
      });
  });
} else {
  console.log("Form not found.");
}
