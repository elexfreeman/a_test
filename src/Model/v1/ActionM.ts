import BaseModel from './BaseModel';

// Системные сервисы
import MainRequest from '../../System/MainRequest';

// Классы репозиториев
import ActionR from '../../Infrastructure/Repository/ActionR';
import {ActionE} from '../../Infrastructure/Entity/ActionE';


/**
 * Бизнес модель события  
 */
export default class ActionM extends BaseModel {

    /* репозиторий события */
    public actionR: ActionR;

    constructor(req: MainRequest) {
        super(req);
        this.actionR = new ActionR(req);
    }

    /**
     * 
     */
    public async list(): Promise<ActionE[]> {
        await super.list();
        let limit = 10;
        let offset = 0;
        let resp: ActionE[];

        try {
            if (this.req.body['limit']) {
                limit = parseInt(this.req.body['limit']);
            }

            if (this.req.body['offset']) {
                offset = parseInt(this.req.body['offset']);
            }

            resp = await this.actionR.list(limit, offset);
        } catch (e) {
            this.errorSys.error('ActionM_list', e);
        }

        return resp;

    }

    /**
     * 
     */
    public async getById(): Promise<ActionE> {
        let resp: ActionE;
        let action_id: number;
        try {    

            if (this.req.body['action_id']) {
                action_id = parseInt(this.req.body['action_id']);
            }
            resp = await this.actionR.getById(action_id);

        } catch (e) {
            this.errorSys.error('ActionM_getById', e);
        }
        return resp;
    }

    public async create() {

    }

    public async update() {

    }


    /* выдает ключ по логину паролю */
    public async getUserTokenByLoginAndPass(body: {
        login: string;
        pass: string;
    }): Promise<string> {

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
