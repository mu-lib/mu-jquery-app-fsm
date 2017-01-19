(function (modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-app-machina/example/signalWidget"] = factory.apply(root, modules.map(function (m) {
      return this[m] || root[m.replace(/^\.{2}/, "mu-jquery-app-machina")];
    }));
  }
})([
  "../create",
  "../widget"
], this, function (create, widget) {
  function check(data) {
    this.$element.find("input[type='radio'][value='" + data.status + "']").prop("checked", true);
  }
  return create(widget, {
    "fsm/vehicles": check,
    "fsm/pedestrians": check
  });
});