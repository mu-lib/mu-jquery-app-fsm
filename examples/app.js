(function (modules, factory) {
  var root = this;

  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-app-machina/examples/app"] = factory.apply(root, modules.map(function (m) {
      return this[m] || root[m.replace(/^\./, "mu-jquery-app-machina/example")];
    }, {
        "jquery": root.jQuery
      }));
  }
})(["jquery", "mu-jquery-loom/jquery.loom", "./crosswalk"], function (jQuery, loom, crosswalk) {
  var root = this;

  jQuery.fn.loom = loom;

  function load(module) {
    return root[module];
  }

  jQuery(function ($) {
    $(document)
      .loom("[mu-widget]", "mu-widget", load, {
        "fsm": crosswalk
      })
      .weave()
      .then(function() {
        crosswalk.transition("vehiclesEnabled");
      }, console.error.bind(console));
  });
});