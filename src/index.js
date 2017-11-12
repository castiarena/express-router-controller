import fs from 'fs';
import path from 'path';

const configFileName = '/express-controllers.config.js';



/**
 * Register controllers
 * @param router
 */
const register = router => {

  const {
    controllers,
    defaultHome,
    defaultCommonName,
    defaultRoute
  } = require(`${path.dirname(require.main.filename)}${configFileName}`);

  controllers.forEach((Controller) => {
    const controller = new Controller();
    const controllerName = controller.constructor.name.replace(defaultCommonName, '');

    // only if configure "dinamic" object on controller class
    if (controller.dinamic) {
      const path = `/${controllerName === defaultHome ? '' : controllerName.toLowerCase()}`;
      Object.keys(controller.dinamic).forEach((dinamic) => {
        Object.keys(controller.dinamic[dinamic]).forEach((method) => {
          router[method](`${path}${dinamic}`, (req, res) => controller.dinamic[dinamic][method](req, res));
        });
      });
      return;
    }

    // sub routes are all methods less "constructor"
    const subRoutes = Object.getOwnPropertyNames(Controller.prototype)
      .filter(name => name !== 'constructor');

    // iterate for each sub route and expose every endpoint linked to a method
    subRoutes.forEach((subRoute) => {
      controller.methods.filter(name => name !== 'constructor').forEach((method) => {
        let path = `/${controllerName === defaultHome ? '' : controllerName.toLowerCase()}`;
        if (subRoute !== defaultRoute) {
          path = `${path}/${subRoute.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        }
        router[method](path, (req, res) => controller[subRoute](req, res));
      });
    });
  });
};

export default { register };
