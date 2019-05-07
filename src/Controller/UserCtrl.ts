
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
class UserApiController {

    public responseSys: ResponseSys;

    public userM: UserM;

    public userSys: UserSys;

    public errorSys: ErrorSys;

    /**
     * Конструктор
     *
     * @param req
     * @param res
     */
    public static async init(req: MainRequest, res: any): Promise<UserApiController> {
        let self = new UserApiController();

        // Инициализация системных сервисов
        self.userSys = req.sys.userSys;
        self.errorSys = req.sys.errorSys;
        self.responseSys = req.sys.responseSys;


        //==================================================
        // Инициализация бизнес моделей
        self.userM = new UserM(req);


        return self;

    }
}

// ==========================================
// SELECT
// ==========================================

/**
 * Получить инфу об юзера по ключу
 */
router.post('/user/get_info_by_api_key', async (req: MainRequest, res: any, next: any) => {
    let self = await UserApiController.init(req, res);
    let body = {};
    if (req.body.apikey) {
        body = await self.userM.fGetUserInfoByApiKey(req.body.apikey);
    } else {
        self.errorSys.error('invalid_apikey', 'Что-то не так с длиной ключа');
    }
    res.send(
        self.responseSys.response(body, 'Инфа об юзере')
    );
   

});

/**
 * проверка авторизации
 */
router.post('/user/is_auth', async (req: MainRequest, res: any, next: any) => {
    let self = await UserApiController.init(req, res);

    res.send(
        self.responseSys.response({}, 'проверка авторизации')
    );
   

});


/**
 * пожтверждение регитарации
 */
router.post('/user/get_api_key_by_sms', async (req: MainRequest, res: any, next: any) => {
    let self = await UserApiController.init(req, res);

    res.send(
        self.responseSys.response(await self.userM.getApiKeyByPhoneAndSms(req.body), 'проверка авторизации')
    );   

});


export { router };
