/* 
    Тест ActionR
*/


process.env.TS_NODE_PROJECT = './tsconfig.json';
// process.env.TS_CONFIG_PATHS = 'true';
const mocha = require('ts-mocha');
const assert = require('chai').assert;
const should = require('chai').should();
const expect = require('chai').expect;

import MainRequest from '../src/System/MainRequest';
import { ErrorSys } from '../src/System/ErrorSys';
import ActionR from "../src/Infrastructure/Repository/ActionR";

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
const actionR = new ActionR(req);

const run = async () => {

    await describe('Тестирование репозитория action', async () => {


        it('Добавление события', async () => {

            let action_id = await actionR.create({
                action_id: null,
                name: 'name',
                start_date: 123456,
                end_date: 1234567
            });

            assert.isAbove(action_id, 0);

        }).timeout(1000);



        it('Обновление события', async () => {

            let resp = await actionR.update({
                action_id: 1,
                name: 'name2',
                start_date: 123456,
                end_date: 1234567
            });

            assert.equal(resp, true);

        }).timeout(1000);


        it('Получение события', async () => {

            let resp = await actionR.getById(1);

            assert.equal(resp['action_id'], 1);

        }).timeout(1000);


        it('Получение списка событий', async () => {

            let resp = await actionR.list(0,10);

            assert.isAbove(resp.length, 0);

        }).timeout(1000);




    });

}

run();