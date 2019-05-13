import BaseModel from './BaseModel';

import * as moment from 'moment';

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

    /**
     * 
     */
    public async create() {
        let resp: number;
        let action: ActionE;
        try {

            if (this.req.body['action']) {
                action = this.req.body['action'];
            }

            resp = await this.actionR.create(action);

        } catch (e) {
            this.errorSys.error('ActionM_create', e);
        }
        return resp;
    }


    private validate(action: ActionE): boolean {
        let resp: boolean = true;

        try {
            /* валидация id */
            if (action['action_id']) {
                /* может прийти в виде строки число */
                if ((parseInt(action['action_id'] + '') == 0) || (isNaN(parseInt(action['action_id'] + '')))) {
                    this.errorSys.error('action_id', 'Пустое action_id');
                    resp = false;
                }
            } else {
                this.errorSys.error('action_id', 'Пустое action_id');
                resp = false;
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

            /* валидация даты начала */
            /* if (!action['start_date']) {
                this.errorSys.error('start_date', 'Пустое start_date');
               resp = false;
            } */
        } catch (e) {
            resp = false;
        }

        return resp;
    }

    /**
     * 
     */
    public async update() {
        let resp: boolean;

        try {

            if (!this.req.body['action']) {
                this.errorSys.error('empty_action', 'Пустое событие');
                throw "error";
            }

            if (!this.req.body['action']['action_id']) {
                this.errorSys.error('action_id', 'Пустое action_id');
                throw "error";
            }

            /* запускаем валидацию */
            if(!this.validate(this.req.body['action'])){
                throw "error";
            }

            /* все ок обновляем */
            resp = await this.actionR.update(this.req.body['action']);

        } catch (e) {
            this.errorSys.error('ActionM_create', e);
        }
        return resp;
    }


}
