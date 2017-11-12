import { AbstractController } from 'express-controllers';

class ExampleController extends AbstractController {
  constructor(){
    super(['get']);
  }
  index(req, res){
    res.send('Hola mundo');
  }
}

export default ExampleController;
