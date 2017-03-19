(function (modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-app-machina/example/vehicle-light"] = factory.apply(root, modules.map(function (m) {
      return this[m] || root[m.replace(/^\.{1,2}/, function (p) {
        return "mu-jquery-app-machina" + (p === "." ? "/example" : "");
      })];
    }));
  }
})(["../widget", "./light"], this, function (widget, light) {
  return widget.extend({
    "fsm/vehicles": light
  });
});