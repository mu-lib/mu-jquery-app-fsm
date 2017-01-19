(function (modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-app-machina/example/pedestrian-light"] = factory.apply(root, modules.map(function (m) {
      return this[m] || root[m.replace(/^\.{1,2}/, function (p) {
        return "mu-jquery-app-machina" + (p === "." ? "/example" : "");
      })];
    }));
  }
})(["../create", "../widget", "./light"], this, function (create, widget, light) {
  return create(widget, {
    "fsm/pedestrians": function(data) {
      if (data.status === "DO_NOT_WALK" && !!data.flashing) {
        data.status = "WALK";
      }
      return light.call(this, data);
    }
 });
});