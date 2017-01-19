(function (modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-app-machina/widget"] = factory.apply(root, modules.map(function (m) {
      return root[m];
    }));
  }
})(["mu-jquery-app/widget"], this, function (widget) {
  return widget.concat(function ($element, ns, opt) {
    var me = this
    var $ = $element.constructor;
    var ops = me.constructor.fsm.slice();
    var fsm = opt.fsm;

    ["handle", "transition", "clearQueue", "deferAndTransition", "compositeState"].forEach(function (method) {
      me[method] = $.proxy(fsm[method], fsm);
    });

    me.on("initialize", function() {
      ops = $.map(ops, function (op) {
        return fsm.on(op.name, $.proxy(op.handler, me));
      });
    });

    me.on("finalize", function() {
      ops = $.map(ops, function (op) {
        return op.off();
      });
    });
  });
});