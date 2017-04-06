(function (umd) {
  umd("mu-jquery-app-machina/fsm")(["mu-create/regexp"], function (regexp) {
    return regexp(/^fsm\/(.+)/, function (result, data, name) {
      (result.fsm = result.fsm || []).push({
        "name": name,
        "handler": data.value
      });

      return false;
    });
  });

  umd("mu-jquery-app-machina/create")(["mu-jquery-widget/create", "./fsm"], function (create, fsm) {
    return create.extend(fsm);
  });

  umd("mu-jquery-app-machina/widget")(["./create", "mu-jquery-widget/widget"], function (create, widget) {
    return create(widget.concat(), function ($element, ns, opt) {
      var me = this
      var $ = $element.constructor;
      var ops = me.constructor.fsm.slice();
      var fsm = opt.fsm;

      ["handle", "transition", "clearQueue", "deferAndTransition", "compositeState"].forEach(function (method) {
        me[method] = $.proxy(fsm[method], fsm);
      });

      me.on("initialize", function () {
        ops = $.map(ops, function (op) {
          return fsm.on(op.name, $.proxy(op.handler, me));
        });
      });

      me.on("finalize", function () {
        ops = $.map(ops, function (op) {
          return op.off();
        });
      });
    });
  });
})(function (name) {
  var prefix = name.replace(/\/.+$/, "");
  var root = this;

  return function (modules, factory) {
    if (typeof define === "function" && define.amd) {
      define(modules, factory);
    } else {
      root[name] = factory.apply(root, modules.map(function (m) {
        return root[m.replace(/^\./, prefix)] || m;
      }));
    }
  }
});
