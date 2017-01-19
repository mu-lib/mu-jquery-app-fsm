(function (modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-app-machina/example/pedestrianSignal"] = factory.apply(root, modules.map(function (m) {
      return this[m] || root[m];
    }, {
        "machina": root.machina
      }));
  }
})(["machina"], this, function (machina) {
  return new machina.Fsm({
    namespace: "pedestrian-signal",
    initialState: "uninitialized",
    reset: function () {
      this.transition("walking");
    },
    states: {
      uninitialized: {
        "*": function () {
          this.deferUntilTransition();
          this.transition("walking");
        }
      },
      walking: {
        _onEnter: function () {
          this.timer = setTimeout(function () {
            this.handle("timeout");
          }.bind(this), 30000);
          this.emit("pedestrians", { status: "WALK" });
        },
        timeout: "flashing",
        _onExit: function () {
          clearTimeout(this.timer);
        }
      },
      flashing: {
        _onEnter: function () {
          this.timer = setTimeout(function () {
            this.handle("timeout");
          }.bind(this), 5000);
          this.emit("pedestrians", { status: "DO_NOT_WALK", flashing: true });
        },
        timeout: "dontwalk",
        _onExit: function () {
          clearTimeout(this.timer);
        }
      },
      dontwalk: {
        _onEnter: function () {
          this.timer = setTimeout(function () {
            this.handle("timeout");
          }.bind(this), 1000);
        },
        _reset: "walking",
        _onExit: function () {
          clearTimeout(this.timer);
        }
      }
    }
  });
});