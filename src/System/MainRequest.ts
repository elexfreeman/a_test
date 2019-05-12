import {ErrorSys} from './ErrorSys';
import {UserSys} from './UserSys';
import {ResponseSys} from './ResponseSys';

export default interface MainRequest {
    headers: { [key: string]: any };
    body: any;
    method: string;
    sys: {
        token: string, 
        isAuth: boolean, /* флаг авторизации */
       
        errorSys: ErrorSys,
        userSys: UserSys,
        responseSys: ResponseSys,

    }
}