var util = require('util');
var AbstractController = require('express-controllers').AbstractController;

function ExampleController(){
  AbstractController.call(this, ['get']);
}

util.inherits(ExampleController, AbstractController);

ExampleController.prototype.index = function(req, res){
  res.send('Hello world');
}

module.exports = ExampleController;
