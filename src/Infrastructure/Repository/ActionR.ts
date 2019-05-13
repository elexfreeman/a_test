import BaseR from './BaseR';
import { ActionE } from '../Entity/ActionE';

/**
 * Репозиторий события
 */
export default class ActionR extends BaseR {

   
    /**
     * Список действий
     * @param limit 
     * @param offset 
     */
    async list(limit: number, offset: number): Promise<ActionE[]> {
        let resp: ActionE[];
        let result: any;

        let sql = `SELECT * FROM actions a
        ORDER BY a.action_id LIMIT :limit OFFSET :offset`;
        
        try {
            result = await this.db.raw(sql, {
                'limit': limit,
                'offset': offset
            });

            if ((result.rows) && (result.rowCount > 0)) {
                resp = result.rows;
            } else {
                throw 'error';
            }

        } catch (e) {
            console.log(e);
            this.errorSys.error('ActionR_list', 'Не удалось список событий');
        }
        return resp;
    } 
    
    /**
     * по id
     * @param action_id 
     */
    public async getById(action_id: number): Promise<ActionE> {
        let resp: ActionE;
        let result: any;

        let sql = `SELECT * FROM actions a
        WHERE a.action_id = :action_id`;
        
        try {
            result = await this.db.raw(sql, {
                'action_id': action_id                
            });

            if ((result.rows) && (result.rowCount > 0)) {
                resp = result.rows[0];
            } else {
                throw 'error';
            }

        } catch (e) {
            console.log(e);
            this.errorSys.error('ActionR_getById', 'Не удалось событие');
        }
        return resp;
    }

    /**
     * создание
     * @param action 
     */
    public async create(action: ActionE): Promise<number> {
        let data = action;
        let resp = [0];

        /* убираем action_id */
        delete data.action_id;

        try {
            resp = await this.db('actions')
                .returning('action_id')
                .insert(data);
        } catch (e) {
            this.errorSys.error('ActionR_create', 'Не удалось добавить событие');
        }
        /* возвращаем нулевой элемент массива с последним id */
        return resp[0];
    }


    /**
     * Обновление события
     * @param action 
     */
    public async update(action: ActionE): Promise<boolean> {
        let ok = true;       

        try {
            await this.db('action')
            .where('action_id', '=', action.action_id)
            .update(action);

        } catch (e) {
            ok = false;
            this.errorSys.error('ActionR_update', 'Не удалось обновить событие');
        }

        return ok;
    }

}