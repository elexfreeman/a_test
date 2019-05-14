import BaseModel from './BaseModel';


// Системные сервисы
import MainRequest from '../../System/MainRequest';

// Классы репозиториев
import ActionR from '../../Infrastructure/Repository/ActionR';
import { ActionE } from '../../Infrastructure/Entity/ActionE';



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
            if (!this.req.sys.isAuth) {
                this.errorSys.error('auth', 'нет доступа');
                throw "auth";
            }

            if (this.req.body['limit']) {
                limit = parseInt(this.req.body['limit']);
            }

            if (this.req.body['offset']) {
                offset = parseInt(this.req.body['offset']);
            }

            resp = await this.actionR.list(offset, limit);
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
            if (!this.req.sys.isAuth) {
                this.errorSys.error('auth', 'нет доступа');
                throw "auth";
            }

            if (this.req.body['action_id']) {
                action_id = parseInt(this.req.body['action_id']);
            }
            resp = await this.actionR.getById(action_id);

        } catch (e) {
            this.errorSys.error('ActionM_getById', e);
        }
        return resp;
    }



    /* валидирование */
    private validate(action: ActionE): boolean {
        let resp: boolean = true;
        

        try {
            if (!this.req.sys.isAuth) {
                this.errorSys.error('auth', 'нет доступа');
                throw "auth";
            }            

            /* валидация имени */
            if (action['name']) {
                if (action['name'].length < 3) {
                    this.errorSys.error('name', 'Длинна имени меньше 3');
                    resp = false;
                }
            } else {
                this.errorSys.error('name', 'Пустое имя');
                resp = false;
            }

        } catch (e) {
            this.errorSys.error('validate ', e);
            resp = false;
        }

        return resp;
    }

    /**
     * 
     */
    public async create() {
        let resp: number;
        let action: ActionE;
        try {

            if (!this.req.sys.isAuth) {
                this.errorSys.error('auth', 'нет доступа');
                throw "auth";
            }

            if (this.req.body) {
                action = this.req.body;
            }

            /* запускаем валидацию */
            if (!this.validate(this.req.body)) {
                throw "validate error";
            }

            resp = await this.actionR.create(action);

        } catch (e) {
            this.errorSys.error('ActionM_create', e);
        }
        return resp;
    }


    /**
     * 
     */
    public async update() {
        let resp: boolean;

        try {

            if (!this.req.sys.isAuth) {
                this.errorSys.error('auth', 'нет доступа');
                throw "auth";
            }

            if (!this.req.body) {
                this.errorSys.error('empty_action', 'Пустое событие');
                throw "error";
            }

            if (!this.req.body['action_id']) {
                this.errorSys.error('action_id', 'Пустое action_id');
                throw "error";
            }

            /* запускаем валидацию */
            if (!this.validate(this.req.body)) {
                throw "error";
            }

            /* все ок обновляем */
            resp = await this.actionR.update(this.req.body);

        } catch (e) {
            this.errorSys.error('ActionM_create', e);
        }
        return resp;
    }


}
