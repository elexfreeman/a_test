import MainRequest from '../MainRequest';
import {ErrorSys} from '../ErrorSys';

/* LEGO ошибок */
export default function ErrorSysMiddleware(request: MainRequest, response: any, next: any) {

    request.sys = {
        token: '',
        errorSys: null,
        userSys: null,
        responseSys: null,
        isAuth: false
    }

    request.sys.errorSys = new ErrorSys(request);
    next();
}