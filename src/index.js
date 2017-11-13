import fs from 'fs';
import path from 'path';

const configFileName = '/express-controllers.config.js';


// polyfill find
if (!Array.prototype.find){
  require('array.prototype.find').shim();
}

/**
 * Register controllers
 * @param router
 */
const register = router => {

  const config = require(`${path.dirname(require.main.filename)}${configFileName}`);
  let {
    controllers,
    defaultHome,
    defaultCommonName,
    defaultRoute
  } = config.default ? config.default : config;

  defaultHome = defaultHome || 'Home';
  defaultCommonName = defaultCommonName || 'Controller';
  defaultRoute = defaultRoute || 'index';

  if(!controllers || controllers.length === 0){
    throw new Error('Please set the controller to the register at file: '+ configFileName);
  }

  controllers.forEach((Controller) => {

    const controller = new Controller();
    const controllerName = controller.constructor.name.replace(defaultCommonName, '');

    const length = controllerName.length;

    // only if configure "dinamic" object on controller class
    if (controller.dinamic) {
      const path = `/${controllerName === defaultHome ? '' : controllerName.replace(/([A-Z])/g, '-$1').toLowerCase().slice(1, length + 1)}`;
      Object.keys(controller.dinamic).forEach((dinamic) => {
        Object.keys(controller.dinamic[dinamic]).forEach((method) => {
          controller.excluded.push(controller.dinamic[dinamic][method]);
          router[method](`${path}${dinamic}`, (req, res) => controller.dinamic[dinamic][method](req, res));
        });
      });
    }


    // sub routes are all methods less "constructor"
    const subRoutes = Object.getOwnPropertyNames(Controller.prototype)
      .filter(name => name !== 'constructor')
      .filter(name =>{
        return Controller.prototype[name] !== controller.excluded.find(exclude =>{
          return Controller.prototype[name].name === exclude.name.replace('bound ','');
        });
      });


    // iterate for each sub route and expose every endpoint linked to a method
    subRoutes.forEach((subRoute) => {
      controller.methods.forEach((method) => {
        let path = `/${controllerName === defaultHome ? '' : controllerName.replace(/([A-Z])/g, '-$1').toLowerCase().slice(1, length + 1)}`;
        if (subRoute !== defaultRoute) {
          path = `${path}/${subRoute.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        }
        router[method](path, (req, res) => controller[subRoute](req, res));
      });
    });
  });
};

export default { register };
