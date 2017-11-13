'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Abstract controller
 */
var AbstractController = function AbstractController() {
  var methods = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['get', 'post', 'options', 'patch'];

  _classCallCheck(this, AbstractController);

  if (this.constructor.name === AbstractController.name) {
    throw new Error(AbstractController.name + ' is a abstract class, please do not instance him');
  }
  this.methods = methods;
  this.excluded = [];
  this.dinamic = {};
};

exports.default = AbstractController;