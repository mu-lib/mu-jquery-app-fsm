(function (modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-app-machina/create"] = factory.apply(root, modules.map(function (m) {
      return root[m.replace(/^\./, "mu-jquery-app-machina")];
    }));
  }
})(["mu-jquery-app/create", "./fsm"], this, function (create, fsm) {
  return create.extend(fsm);
});