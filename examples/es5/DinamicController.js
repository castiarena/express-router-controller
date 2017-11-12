const { AbstractDinamicController } = require('express-controllers');

class DinamicController extends AbstractDinamicController {
  constructor(){
    super();
    this.dinamic = {
      '/foo/:bar/': {
        get: this.fooBar.bind(this)
      }
    }
  }
  fooBar(req, res){
    res.send('Hello world, dinamic example retrieve params: '+ req.params.bar );
  }
}

module.exports = DinamicController;
