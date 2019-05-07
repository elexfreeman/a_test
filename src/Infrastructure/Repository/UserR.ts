
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

        return resp;
    }

}