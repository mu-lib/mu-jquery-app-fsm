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
})(["jquery", "mu-jquery-capture/add", "mu-jquery-loom/jquery.loom", "./crosswalk"], function (jQuery, add, loom, crosswalk) {
  var root = this;
  var $event = jQuery.event;

  function load(module) {
    return root[module];
  }

  $event.add = add.call(jQuery, $event.add);

  loom.call(jQuery.fn, "[mu-widget]", "mu-widget", load, {
    "fsm": crosswalk
  });

  jQuery(function ($) {
    $(document).weave().then(function () {
      crosswalk.transition("vehiclesEnabled");
    }, console.error.bind(console));
  });
});