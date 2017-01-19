(function (modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-app-machina/example/crosswalk"] = factory.apply(root, modules.map(function (m) {
      return this[m] || root[m.replace(/^\./, "mu-jquery-app-machina/example")];
    }, {
        "machina": root.machina
      }));
  }
})(["machina", "./vehicleSignal", "./pedestrianSignal"], this, function (machina, vehicleSignal, pedestrianSignal) {
  return new machina.Fsm({
    namespace: "crosswalk",
    initialState: "uninitialized",
    states: {
      uninitialized: {
        "*": function () {
          this.deferUntilTransition();
        }
      },
      vehiclesEnabled: {
        // after _onEnter execs, send "reset" input down the hierarchy
        _onEnter: function () {
          this.emit("pedestrians", { status: "DO_NOT_WALK" });
        },
        timeout: "pedestriansEnabled",
        _child: vehicleSignal,
      },
      pedestriansEnabled: {
        _onEnter: function () {
          this.emit("vehicles", { status: "RED" });
        },
        timeout: "vehiclesEnabled",
        _child: pedestrianSignal
      }
    }
  });
});