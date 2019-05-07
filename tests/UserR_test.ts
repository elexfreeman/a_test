process.env.TS_NODE_PROJECT = './tsconfig.json';
// process.env.TS_CONFIG_PATHS = 'true';
const mocha = require('ts-mocha');
const assert = require('chai').assert;
const should = require('chai').should();
const expect = require('chai').expect;

import MainRequest from '../src/System/MainRequest';
import { ErrorSys } from '../src/System/ErrorSys';
import UserR from "../src/Infrastructure/Repository/UserR";

/* инициализируем репозиторий */
let req: MainRequest;
req = {
    headers: {},
    body: null,
    method: '',
    sys: {
        apikey: '',
        errorSys: null,
        userSys: null,
        responseSys: null,
        bAuth: false
    }
}

req.sys.errorSys = new ErrorSys(req);
const userR = new UserR(req);

const run = async () => {

    await describe('Тестирование репозитория', async () => {

        it('Получение токена по логину и паролю', async () => {

            let apikey = await userR.getUserApikeyByLoginAndPass('login', 'pass');

            assert.isAbove(apikey.length, 0);

        }).timeout(5000);


    });

}

run();