import path from 'path';
/**
 * Abstract controller
 */
class AbstractController {
  constructor(methods = ['get', 'post', 'options', 'patch']) {
    if (this.constructor.name === AbstractController.name) {
      throw new Error(`${AbstractController.name} is a abstract class, please do not instance him`);
    }
    this.methods = methods;
  }
}

export default AbstractController;