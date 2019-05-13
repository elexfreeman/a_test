/* 
    Тест UserM
*/
process.env.TS_NODE_PROJECT = './tsconfig.json';
// process.env.TS_CONFIG_PATHS = 'true';
const mocha = require('ts-mocha');
const assert = require('chai').assert;
const should = require('chai').should();
const expect = require('chai').expect;

import MainRequest from '../src/System/MainRequest';
import { ErrorSys } from '../src/System/ErrorSys';
import UserM from "../src/Model/v1/UserM";

/* инициализируем репозиторий */
let req: MainRequest;
req = {
    headers: {},
    body: null,
    method: '',
    sys: {
        token: '',
        errorSys: null,
        userSys: null,
        responseSys: null,
        isAuth: false
    }
}

req.sys.errorSys = new ErrorSys(req);
const userM = new UserM(req);

const run = async () => {

    await describe('Тестирование модели пользователя', async () => {

        it('Получение токена по логину и паролю', async () => {

            let token = await userM.getUserTokenByLoginAndPass({
                login: 'john',
                pass: 'a123343423234'
            });
            
            assert.isAbove(token.length, 0);

        }).timeout(1000);

    });

}

run();