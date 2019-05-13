import * as express from 'express';

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ limit: '50mb',extended: true }));

const cors = require('cors');
/*для подкл к API*/
app.use(cors());
app.options('*', cors());


/* LEGO ошибок */
import ErrorSysMiddleware from './System/Middleware/ErrorSysMiddleware'
app.use(ErrorSysMiddleware);

/* Переводим пост в JSON */
import RequestSysMiddleware from './System/Middleware/RequestSysMiddleware'
app.use(RequestSysMiddleware);

import ResponseSysMiddleware from './System/Middleware/ResponseSysMiddleware'
app.use(ResponseSysMiddleware);

/* проверка авторизации на уровне приложения */
import AuthSysMiddleware from './System/Middleware/AuthSysMiddleware'
app.use(AuthSysMiddleware);


import * as TestCtrl from './Controller/TestCtrl';
app.use(TestCtrl.router);





console.log('server start at http://localhost:3005');
app.listen(3005);
