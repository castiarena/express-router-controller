const { AbstractController } = require('express-controllers');

class ExampleController extends AbstractController {
  constructor(){
    super(['get']);
  }
  index(req, res){
    res.send('Hola mundo');
  }
}

module.exports = ExampleController;
