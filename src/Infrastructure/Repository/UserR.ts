
import BaseR from "./BaseR";
import { UserE, UserSafeE } from "../Entity/UserE";


export default class UserR extends BaseR {

    /* инфа об пользователе по его токену */
    async getUserInfoByApiKey(apikey: string): Promise<UserE> {
        let resp: UserE;


        return resp;
    }

    /* список пользователей */
    async getUserList(offset: string, limit: string): Promise<UserSafeE[]> {
        let resp: UserSafeE[];


        return resp;
    }

    /* получение токена юзера по его логину и паролю */
    async getUserApikeyByLoginAndPass(login: string, password: string): Promise<string> {
        let resp: string;

        let sql = `select u.apikey from users u
        where u.login=:login and u.pass = :pass`;

        /* ИЛИ через queryBuilder */
        /* 
        await this.db('users').where({
            login: 'Test',
            pass:  'User'
            }).select('apikey') 
        */
        let result;
        try {
            result = await this.db.raw(sql, {
                'login': login,
                'pass': password
            });
            
            if ((result.rows) && (result.rowCount > 0)) {
                resp = result.rows[0]['apikey'];
            } else {
                throw 'error';
            }

        } catch (e) {
            this.errorSys.error('get_user', 'Не удалось получить пользователя');
        }    
        return resp;
    }

}