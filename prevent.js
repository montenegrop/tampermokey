// Object.defineProperty(window, "location", {
//   configurable: false,
//   enumerable: true,
//   get: function () {
//     return {
//       href: window.location.href,
//       assign: function () {
//         console.log("Intercepted redirect to:", arguments[0]);
//       },
//       replace: function () {
//         console.log("Intercepted replace to:", arguments[0]);
//       },
//     };
//   },
//   set: function (value) {
//     console.log("Attempted to redirect to:", value);
//   },
// });

// window.addEventListener("beforeunload", function (event) {
//   event.preventDefault();
//   event.returnValue = ""; // Some browsers require returnValue to be set
// });

// window.addEventListener("beforeunload", function (event) {
//   console.log("unlaod");
//   console.log(event);

//   event.preventDefault();
//   event.returnValue = "";
//   return "";
// });
