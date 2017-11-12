'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AbstractController2 = require('./AbstractController');

var _AbstractController3 = _interopRequireDefault(_AbstractController2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Abstract controller
 */
var AbstractDinamicController = function (_AbstractController) {
  _inherits(AbstractDinamicController, _AbstractController);

  function AbstractDinamicController(methods) {
    _classCallCheck(this, AbstractDinamicController);

    var _this = _possibleConstructorReturn(this, (AbstractDinamicController.__proto__ || Object.getPrototypeOf(AbstractDinamicController)).call(this, methods));

    if (_this.constructor.name === AbstractDinamicController.name) {
      throw new Error(AbstractDinamicController.name + ' is a abstract class, please do not instance him');
    }
    _this.dinamic = {};
    return _this;
  }

  return AbstractDinamicController;
}(_AbstractController3.default);

exports.default = AbstractDinamicController;