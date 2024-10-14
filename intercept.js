// Sobreescribe window.location para evitar redirecciones
Object.defineProperty(window, "location", {
  configurable: false,
  enumerable: true,
  get: function () {
    return {
      href: window.location.href,
      // Otros atributos de window.location
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
