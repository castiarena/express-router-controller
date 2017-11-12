import AbstractDinamicController from './AbstractControllers/AbstractDinamicController';

class DinamicController extends AbstractDinamicController{
  constructor(){
    super([
      'post',
      'get'
    ]);

  }

  index(req, res){

  }
}

export default DinamicController;