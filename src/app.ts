import 'express-async-errors';
import express from 'express';
import cors from 'cors';

import serverMiddlewareError from './middlewares/serverMiddlewareError';
import router from './routers';

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.use(serverMiddlewareError);

export {
    app,
};
