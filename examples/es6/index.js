import express from 'express';
import expressControllers from 'express-controllers';
const router = express.Router();

expressControllers.register(router);

const app = express();

app.use(router);
app.listen(9000);
