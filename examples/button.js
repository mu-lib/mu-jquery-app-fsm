(function (modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-app-machina/example/button"] = factory.apply(root, modules.map(function (m) {
      return this[m] || root[m.replace(/^\.{2}/, "mu-jquery-app-machina")];
    }));
  }
})([
  "../create",
  "../widget"
], this, function (create, widget) {
  return create(widget, {
    "on/initialize": function () {
      var me = this;
      me.$element.text(me.compositeState());
    },
    "on/click": function ($event) {
      this.handle("pedestrianWaiting");
    },
    "fsm/*": function (eventName, data) {
      var me = this;
      switch (eventName) {
        case "transition":
          me.$element.text(me.compositeState());
          console.log(data.namespace, data.fromState, "->", data.toState);
          break;
        case "vehicles":
          console.log("vehicles", data.status);
          break;
        case "pedestrians":
          if (data.flashing) {
            console.log("pedestrians", data.status, "(flashing)");
          } else {
            console.log("pedestrians", data.status);
          }
          break;
      }
    }
  });
});