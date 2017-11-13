var util = require('util');
var AbstractController = require('express-controllers').AbstractController;

function DinamicController(){
  AbstractController.call(this,  ['get']);
  var that = this;
  this.dinamic = {
    '/:id/foo': {
      get: that.idFoo.bind(that)
    }
  }
};

util.inherits(DinamicController, AbstractController);

DinamicController.prototype.index = function(req, res){
  res.send('Hello world');
};

DinamicController.prototype.idFoo = function(req, res){
  res.send('Dinamic example: ' + req.params.id);
}

module.exports = DinamicController;
