import * as express from 'express';

// Подключение системных классов

import { ResponseSys } from '../System/ResponseSys';
import { UserSys } from '../System/UserSys';
import { ErrorSys } from '../System/ErrorSys';
import MainRequest from '../System/MainRequest';

// Подключение системных моделей
import { UserM } from '../Model/UserM';

const router = express.Router();

/**
 * API для Админки
 * Редактирование и управление пользователями, а так-же их правами
 */
class AuthCtrl {

    public responseSys: ResponseSys;
    public userM: UserM;
    public errorSys: ErrorSys;

    /**
     * Конструктор
     * нужен для асинхронной инициализации   
     */
    public static async init(req: MainRequest, res: any): Promise<AuthCtrl> {
        let self = new AuthCtrl();
        // Инициализация системных сервисов       
        self.errorSys = req.sys.errorSys;
        self.responseSys = req.sys.responseSys;

        //==================================================
        // Инициализация бизнес моделей
        self.userM = new UserM(req);
        /* тут может быть вызван асинхронный метод init для модели по мере необходимости */

        return self;

    }
}


/**
 * авторизация пользователя по логину и паролю
 */
router.post('/auth', async (req: MainRequest, res: any, next: any) => {
    let self = await AuthCtrl.init(req, res);

    res.send(
        self.responseSys.response(await self.userM.getApiKeyByPhoneAndSms(req.body), 'проверка авторизации')
    );   

});


export { router };
