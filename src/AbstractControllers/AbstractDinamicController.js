import AbstractController from './AbstractController';
/**
 * Abstract controller
 */
class AbstractDinamicController extends AbstractController {
  constructor(methods) {
    super(methods);
    if (this.constructor.name === AbstractDinamicController.name) {
      throw new Error(`${AbstractDinamicController.name} is a abstract class, please do not instance him`);
    }
    this.dinamic = {};
  }

}

export default AbstractDinamicController;
