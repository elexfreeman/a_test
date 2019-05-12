import * as md5 from 'md5';

import BaseModel from './BaseModel';

// Системные сервисы
import MainRequest from '../../System/MainRequest';

// Классы репозиториев
import UserR from '../../Infrastructure/Repository/UserR';


/**
 * Бизнес модель пользователя  
 */
export class UserM extends BaseModel {

    /* репозиторий пользователя */
    public userR: UserR; 

    constructor(req: MainRequest) {
        super(req);      
        this.userR = new UserR(req);
    }


    /* выдает ключ по логину паролю */
    public async getUserTokenByLoginAndPass(body: {
        login: string;
        pass: string;
    }) {

        let token;
        let ok = true;

        // Декларирование ошибок
        this.errorSys.declare([
            'login', /* если нет логина */
            'pass', /* если нет пароля */
            'reg', /* если нету такого юзера  */
        ]);

        try {

            if (!body) {
                this.errorSys.error('login', 'Не заполнено поле логин');
                this.errorSys.error('pass', 'Не заполнено поле пароль');
                throw "erro body";
            }

            /* если нету телефона */
            if (!body.login) {
                this.errorSys.error('login', 'Не заполнено поле логин');
                ok = false;
            }
            /* если нету sms */
            if (!body.pass) {
                this.errorSys.error('pass', 'Не заполнено поле пароль');
                ok = false;
            }

            if (ok) {
                /* пытаемся получить token */
                token = await this.userR.getUserTokenByLoginAndPass(body.login, md5(body.pass));
            }


            /* если нету такого юзера  */
            if (!token) {
                this.errorSys.error('reg', 'Такой пользователь отсутствует');
                ok = false;
            }

            if (!ok) {
                throw "erro body";
            }

        } catch (e) {
            /* что-то не так */
            /* console.log(e) */

        }

        return token;

    }

}
