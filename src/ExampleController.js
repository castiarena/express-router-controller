import AbstractController from './AbstractControllers/AbstractController';

class ExampleController extends AbstractController{
  constructor(){
    super([
      'post',
      'get'
    ]);

  }

  index(req, res){

  }
}

export default ExampleController;