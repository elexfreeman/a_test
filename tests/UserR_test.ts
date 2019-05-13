/* 
    Тест UserR
*/


process.env.TS_NODE_PROJECT = './tsconfig.json';
// process.env.TS_CONFIG_PATHS = 'true';
const mocha = require('ts-mocha');
const assert = require('chai').assert;
const should = require('chai').should();
const expect = require('chai').expect;
import * as md5 from "md5";
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
        token: '',
        errorSys: null,
        userSys: null,
        responseSys: null,
        isAuth: false
    }
}

req.sys.errorSys = new ErrorSys(req);
const userR = new UserR(req);

const run = async () => {

    await describe('Тестирование репозитория', async () => {

      

        it('Добавление пользователя', async () => {

            let user_id = await userR.addUser({
                user_id: 0,
                username: 'john',
                login: 'john',
                pass: md5('a123343423234')
            });           

            assert.isAbove(user_id, 0);

        }).timeout(1000);


    

        it('Добавление токена пользователя', async () => {
            let user_id = await userR.addUser({
                user_id: 0,
                username: 'john',
                login: 'john',
                pass: md5('a123343423234')
            });

            let id = await userR.addUserToken({
                id: 0,
                token: '12312qweqweqwe',
                user_id: user_id,
                date: ''
            });           

            assert.isAbove(id, 0);

        }).timeout(1000);


        it('Получение токена по логину и паролю', async () => {

            /* добавляем пользователя */
            let user_id = await userR.addUser({
                user_id: 0,
                username: 'john',
                login: 'john',
                pass: md5('a123343423234')
            });

            /* добавляем ему токен */
            let id = await userR.addUserToken({
                id: 0,
                token: '12312qweqweqwe',
                user_id: user_id,
                date: ''
            });       

            let token = await userR.getUserTokenByLoginAndPass('john', md5('a123343423234'));

            assert.isAbove(token.length, 0);

        }).timeout(1000);



        it('Получение юзера по токену', async () => {

            let user = await userR.getUserByToken('some exist token');           
            
            assert.isAbove(user.user_id, 0);

        }).timeout(1000);


    });

}

run();