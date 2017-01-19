(function (modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-app-machina/example/vehicleSignal"] = factory.apply(root, modules.map(function (m) {
      return this[m] || root[m];
    }, {
        "machina": root.machina
      }));
  }
})(["machina"], this, function (machina) {
  return new machina.Fsm({
    namespace: "vehicle-signal",
    initialState: "uninitialized",
    reset: function () {
      this.transition("green");
    },
    states: {
      uninitialized: {
        "*": function () {
          this.deferUntilTransition();
          this.transition("green");
        }
      },
      green: {
        _onEnter: function () {
          this.timer = setTimeout(function () {
            this.handle("timeout");
          }.bind(this), 30000);
          this.emit("vehicles", { status: "GREEN" });
        },
        timeout: "green-interruptible",
        pedestrianWaiting: function () {
          this.deferUntilTransition("green-interruptible");
        },
        _onExit: function () {
          clearTimeout(this.timer);
        }
      },
      "green-interruptible": {
        pedestrianWaiting: "yellow"
      },
      yellow: {
        _onEnter: function () {
          this.timer = setTimeout(function () {
            this.handle("timeout");
          }.bind(this), 5000);
          this.emit("vehicles", { status: "YELLOW" });
        },
        timeout: "red",
        _onExit: function () {
          clearTimeout(this.timer);
        }
      },
      red: {
        _onEnter: function () {
          this.timer = setTimeout(function () {
            this.handle("timeout");
          }.bind(this), 1000);
        },
        _reset: "green",
        _onExit: function () {
          clearTimeout(this.timer);
        }
      }
    }
  });
});