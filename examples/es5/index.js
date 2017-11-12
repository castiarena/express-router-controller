const express = require('express');
const router = express.Router();
const expressControllers = require('express-controllers');

expressControllers.register(router);

const app = express();

app.use(router);
app.listen(9000);
