# Express router controllers

Create ES6 classes and router your project:
```js
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

create a config file for controllers: `express-controllers.config.js`
```js
const HomeController = require('./HomeController');
module.exports = {
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
import expressControllers from 'express-controllers';

const router = express.Router();
expressControllers.register(router);

// tun app
app.use(router);
app.listen(9000);
```

Run the app
