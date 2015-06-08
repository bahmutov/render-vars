require('lazy-ass');
var check = require('check-more-types');

function addRenderValue(app, name, value) {
  la(check.fn(app), 'missing app', app);
  la(check.unemptyString(name), 'missing name', name);
  la(arguments.length === 3, 'expected 3 arguments', arguments);

  la(check.fn(app.render), 'missing app.render function');

  var _render = app.render.bind(app);
  app.render = function wrapRender(view, locals, callback) {
    locals = locals || {};
    if (!check.has(locals, name)) {
      locals[name] = value;
    }
    return _render(view, locals, callback);
  };
}

module.exports = addRenderValue;
