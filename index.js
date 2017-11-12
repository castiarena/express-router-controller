module.exports = {
  register: require('./dist').default.register,
  AbstractController: require('./dist/AbstractControllers/AbstractController').default,
  AbstractDinamicController: require('./dist/AbstractControllers/AbstractDinamicController').default,
};
