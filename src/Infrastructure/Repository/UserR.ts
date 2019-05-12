import BaseR from "./BaseR";
import { UserE, UserToken } from "../Entity/UserE";

/**
 * Репозиторий пользователя
 */
export default class UserR extends BaseR {   

    /* получение токена юзера по его логину и паролю */
    async getUserTokenByLoginAndPass(login: string, password: string): Promise<string> {
        let resp: string;
        let result: any;

        let sql = `SELECT ut.token FROM users u

        JOIN user_token ut
        ON ut.user_id=u.user_id
        
        WHERE u.login= :login AND pass= :pass
        
        ORDER BY ut.DATE desc
        LIMIT 1`;

        /* ИЛИ через queryBuilder */
        /* 
        await this.db('users').where({
            login: 'Test',
            pass:  'User'
            }).select('apikey') 
        */
       
        try {
            result = await this.db.raw(sql, {
                'login': login,
                'pass': password
            });
         
            if ((result.rows) && (result.rowCount > 0)) {
                resp = result.rows[0]['token'];
            } else {
                throw 'error';
            }

        } catch (e) {
            console.log(e);
            this.errorSys.error('get_user', 'Не удалось получить пользователя');
        }
        return resp;
    }

    /* добавление пользователя */
    async addUser(user: UserE) {

        let data = user;
        let resp = [0];

        /* убираем user_id */
        delete data.user_id;

        try {
            resp = await this.db('users')
                .returning('user_id')
                .insert(data);
        } catch (e) {
            this.errorSys.error('addUser', 'Не удалось добавить пользователя');
        }
        /* возвращаем нулевой элемент массивы с последним id */
        return resp[0];
    }

    /* добавление токена пользователя */
    async addUserToken(userToken: UserToken) {
        /* убираем user_id */
        let data = userToken;
        let resp = [0];


        /* удаляем ненужные поля */
        delete data.date;
        delete data.id;
        
        try {
            resp = await this.db('user_token')
                .returning('id')
                .insert(userToken);
        } catch (e) {
            this.errorSys.error('addUserToken', 'Не удалось добавить токен пользователя');
        }
        /* возвращаем нулевой элемент массивы с последним id */
        return resp[0];
    }

}