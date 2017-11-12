'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path2 = require('path');

var _path3 = _interopRequireDefault(_path2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configFileName = '/express-controllers.config.js';

/**
 * Register controllers
 * @param router
 */
var register = function register(router) {
  var _require = require('' + _path3.default.dirname(require.main.filename) + configFileName),
      controllers = _require.controllers,
      defaultHome = _require.defaultHome,
      defaultCommonName = _require.defaultCommonName,
      defaultRoute = _require.defaultRoute;

  controllers.forEach(function (Controller) {
    var controller = new Controller();
    var controllerName = controller.constructor.name.replace(defaultCommonName, '');

    // only if configure "dinamic" object on controller class
    if (controller.dinamic) {
      var _path = '/' + (controllerName === defaultHome ? '' : controllerName.toLowerCase());
      Object.keys(controller.dinamic).forEach(function (dinamic) {
        Object.keys(controller.dinamic[dinamic]).forEach(function (method) {
          router[method]('' + _path + dinamic, function (req, res) {
            return controller.dinamic[dinamic][method](req, res);
          });
        });
      });
      return;
    }

    // sub routes are all methods less "constructor"
    var subRoutes = Object.getOwnPropertyNames(Controller.prototype).filter(function (name) {
      return name !== 'constructor';
    });

    // iterate for each sub route and expose every endpoint linked to a method
    subRoutes.forEach(function (subRoute) {
      controller.methods.filter(function (name) {
        return name !== 'constructor';
      }).forEach(function (method) {
        var path = '/' + (controllerName === defaultHome ? '' : controllerName.toLowerCase());
        if (subRoute !== defaultRoute) {
          path = path + '/' + subRoute.replace(/([A-Z])/g, '-$1').toLowerCase();
        }
        router[method](path, function (req, res) {
          return controller[subRoute](req, res);
        });
      });
    });
  });
};

exports.default = { register: register };