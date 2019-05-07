import MainRequest from '../MainRequest';
import { UserSys } from '../UserSys';

/* проверка аутентификации на уровне приложения */
export default async function AuthSysMiddleware(request: MainRequest, response: any, next: any) {

    /* токен авторизации */
    request.sys.apikey = '';
    if (request.headers.apikey) {
        request.sys.apikey = request.headers.apikey;
    }

    /* юзерь не авторизован */
    request.sys.bAuth = false;
    const userSys = new UserSys(request);

    if (await userSys.isAuth()) {
        await userSys.init();
        /* проставляем аторизацию */
        request.sys.bAuth = true;

    }
    request.sys.userSys = userSys;

    next();
}