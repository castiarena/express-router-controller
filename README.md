# Express router controllers

Create routes from clases on es6 or es5. See specific [examples](https://github.com/castiarena/express-router-controller/tree/master/examples) for each enviorement (es5, es6-require, es6-import).

## Config routing

Create a config file (`express-controllers.config.js`) on root of your project:
```js
import HomeController from './HomeController';
export default {
  controllers: [
    HomeController
  ],
  defaultHome: 'Home',
  defaultCommonName: 'Controller',
  defaultRoute: 'index'
}
```

Register controllers to the router:
```js
import express from 'express';
import expressRouterControllers from 'express-router-controller';

const router = express.Router();
expressRouterControllers.register(router);

// tun app
app.use(router);
app.listen(9000);
```
## Creating routes and sub-routes

Create a static controller class to route your project:

route `/`
```js
import { AbstractController } from 'express-router-controller';

class HomeController extends AbstractController{
  constructor(){
    super([
      'get', 'post' // verbs
    ]);
  }
  index(req, res){
    res.send('Hello world!');
  }
}
```

Create a dinamic routes mapping to some method, the register do not load this method as static route ;) : `/ID2232/foo` route
```js
import { AbstractController } from 'express-router-controller';

class HomeController extends AbstractController{
  constructor(){
    super([
      'get', 'post' // verbs
    ]);
    this.dinamic = {
      '/:foo/bar':{
        get: this.index.bind(this);
      }
    }
  }
  index(req, res){
    res.send(`Hello world!, your id: ${req.params.id}`);
  }
}
```


# ES5 support (run in node v0.12.5)

Example:

```js
var util = require('util');
var AbstractController = require('express-controllers').AbstractController;

function ExampleController(){
  AbstractController.call(this, ['get']);
}

util.inherits(ExampleController, AbstractController);

ExampleController.prototype.index = function(req, res){
  res.send('Hello world');
}

module.exports = ExampleController;
```


## Unit testing
For testing, only require and execute a instance of your controller:

With mocha + chai:
```js
const HomeController = require('./HomeController');
const home = new HomeController();
const { expect } = require('chai');

describe('Testing home', () => {
  it('should index response "Hello world!"', () => {
    let value = 'foo';
    const mockRequest = {
      send: () => {
          value = 'bar';
      }
    };
    home.index(mockRequest);
    expect(value).to.be.equals('bar');
  });
});
```
