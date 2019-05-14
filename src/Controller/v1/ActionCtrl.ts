import * as express from 'express';
import BaseController from './BaseController';


// Подключение системных классов
import MainRequest from '../../System/MainRequest';

// Подключение системных моделей
import ActionM from '../../Model/v1/ActionM';

const router = express.Router();

/**
 * Контролер событий
 */
class ActionCtrl extends BaseController {

    public actionM: ActionM;
    /**
     * Конструктор
     * нужен для асинхронной инициализации   
     */
    public static async init(req: MainRequest, res: any): Promise<ActionCtrl> {
        let self = new ActionCtrl(req);

        //==================================================
        // Инициализация бизнес моделей
        self.actionM = new ActionM(req);
        /* тут может быть вызван асинхронный метод init для модели по мере необходимости */

        return self;

    }
}


/**
 * создание события
 */
router.post('/v1/action/create', async (req: MainRequest, res: any, next: any) => {
    let self = await ActionCtrl.init(req, res);

    res.send(
        self.responseSys.response(await self.actionM.create(), 'создание события')
    );

});


/**
 * обновления события
 */
router.post('/v1/action/update', async (req: MainRequest, res: any, next: any) => {
    let self = await ActionCtrl.init(req, res);

    res.send(
        self.responseSys.response(await self.actionM.update(), 'обновления события')
    );


});

/**
 * список событий
 */
router.post('/v1/action/list', async (req: MainRequest, res: any, next: any) => {
    let self = await ActionCtrl.init(req, res);

    res.send(
        self.responseSys.response(await self.actionM.list(), 'список событий')
    );

});

/**
 * событие по id
 */
router.post('/v1/action/get', async (req: MainRequest, res: any, next: any) => {
    let self = await ActionCtrl.init(req, res);

    res.send(
        self.responseSys.response(await self.actionM.getById(), 'событие по id')
    );

});


export { router };
