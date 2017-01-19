(function (modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-app-machina/fsm"] = factory.apply(root, modules.map(function (m) {
      return root[m];
    }));
  }
})(["mu-create/regexp"], this, function (regexp) {
  return regexp(/^fsm\/(.+)/, function (result, data, name) {
    (result.fsm = result.fsm || []).push({
      "name": name,
      "handler": data.value
    });

    return false;
  });
});