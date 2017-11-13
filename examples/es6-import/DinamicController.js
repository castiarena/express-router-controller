import { AbstractController } from 'express-controllers';

class DinamicController extends AbstractController {
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

export default DinamicController;
