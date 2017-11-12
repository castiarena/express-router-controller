# Express router controllers

Create a static controller class to route your project:
`/constructor/method`
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

Create a dinamic controller class to route your project:
`/constructor/method`
```js
import { AbstractDinamicController } from 'express-router-controller';

class HomeController extends AbstractDinamicController{
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
