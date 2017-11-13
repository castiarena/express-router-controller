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

// polyfill find
if (!Array.prototype.find) {
  require('array.prototype.find').shim();
}

/**
 * Register controllers
 * @param router
 */
var register = function register(router) {

  var config = require('' + _path3.default.dirname(require.main.filename) + configFileName);

  var _ref = config.default ? config.default : config,
      controllers = _ref.controllers,
      defaultHome = _ref.defaultHome,
      defaultCommonName = _ref.defaultCommonName,
      defaultRoute = _ref.defaultRoute;

  defaultHome = defaultHome || 'Home';
  defaultCommonName = defaultCommonName || 'Controller';
  defaultRoute = defaultRoute || 'index';

  if (!controllers || controllers.length === 0) {
    throw new Error('Please set the controller to the register at file: ' + configFileName);
  }

  controllers.forEach(function (Controller) {

    var controller = new Controller();
    var controllerName = controller.constructor.name.replace(defaultCommonName, '');

    var length = controllerName.length;

    // only if configure "dinamic" object on controller class
    if (controller.dinamic) {
      var _path = '/' + (controllerName === defaultHome ? '' : controllerName.replace(/([A-Z])/g, '-$1').toLowerCase().slice(1, length + 1));
      Object.keys(controller.dinamic).forEach(function (dinamic) {
        Object.keys(controller.dinamic[dinamic]).forEach(function (method) {
          controller.excluded.push(controller.dinamic[dinamic][method]);
          router[method]('' + _path + dinamic, function (req, res) {
            return controller.dinamic[dinamic][method](req, res);
          });
        });
      });
    }

    // sub routes are all methods less "constructor"
    var subRoutes = Object.getOwnPropertyNames(Controller.prototype).filter(function (name) {
      return name !== 'constructor';
    }).filter(function (name) {
      return Controller.prototype[name] !== controller.excluded.find(function (exclude) {
        return Controller.prototype[name].name === exclude.name.replace('bound ', '');
      });
    });

    // iterate for each sub route and expose every endpoint linked to a method
    subRoutes.forEach(function (subRoute) {
      controller.methods.forEach(function (method) {
        var path = '/' + (controllerName === defaultHome ? '' : controllerName.replace(/([A-Z])/g, '-$1').toLowerCase().slice(1, length + 1));
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