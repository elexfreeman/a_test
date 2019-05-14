import * as express from 'express';
import BaseController from './BaseController';


// Подключение системных классов
import MainRequest from '../../System/MainRequest';

// Подключение системных моделей
import UserM from '../../Model/v1/UserM';

const router = express.Router();

/**
 * Авторизация пользователя 
 */
class AuthCtrl extends BaseController {

    public userM: UserM;
    /**
     * Конструктор
     * нужен для асинхронной инициализации   
     */
    public static async init(req: MainRequest, res: any): Promise<AuthCtrl> {
        let self = new AuthCtrl(req);

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
router.post('/v1/auth', async (req: MainRequest, res: any, next: any) => {
    let self = await AuthCtrl.init(req, res);

    res.send(
        self.responseSys.response(await self.userM.getUserTokenByLoginAndPass(req.body), 'проверка авторизации')
    );

});


export { router };
