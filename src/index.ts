import * as express from 'express';

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ limit: '50mb',extended: true }));

const cors = require('cors');
/*для подкл к API*/
app.use(cors());
app.options('*', cors());


/* LEGO ошибок */
import ErrorSysMiddleware from './system/Middleware/ErrorSysMiddleware'
app.use(ErrorSysMiddleware);

/* Переводим пост в JSON */
import RequestSysMiddleware from './system/Middleware/RequestSysMiddleware'
app.use(RequestSysMiddleware);

import ResponseSysMiddleware from './system/Middleware/ResponseSysMiddleware'
app.use(ResponseSysMiddleware);

/* проверка авторизации на уровне приложения */
import AuthSysMiddleware from './system/Middleware/AuthSysMiddleware'
app.use(AuthSysMiddleware);


import * as TestCtrl from './Controller/TestCtrl';
app.use(TestCtrl.router);


import * as IndexController from './Controller/IndexController';
app.use(IndexController.router);

import * as AdminUserController from './Controller/AdminUserController';
app.use(AdminUserController.router);

import * as UpdateCatalogController from './Controller/UpdateCatalogController';
app.use(UpdateCatalogController.router);

import * as UserApiController from './Controller/UserApiController';
app.use(UserApiController.router);

import * as StatementController from './Controller/StatementController';
app.use(StatementController.router);



console.log('server start at http://localhost:3005');
app.listen(3005);
