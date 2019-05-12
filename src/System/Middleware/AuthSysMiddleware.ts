import MainRequest from '../MainRequest';
import { UserSys } from '../UserSys';

/* проверка аутентификации на уровне приложения */
export default async function AuthSysMiddleware(request: MainRequest, response: any, next: any) {

    /* токен авторизации */
    request.sys.token = '';
    if (request.headers.token) {
        request.sys.token = request.headers.token;
    }

    /* юзерь не авторизован */
    request.sys.isAuth = false;
    const userSys = new UserSys(request);

    await userSys.init();
    request.sys.userSys = userSys;
    
    /* проставляем аторизацию */
    request.sys.isAuth = request.sys.userSys.isAuth;   

    next();
}