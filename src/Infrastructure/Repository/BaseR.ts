
// Глобальные сервисы
import сoreDBSys from '../../System/CoreDBSys';

// Системные сервисы
import { ErrorSys } from '../../System/ErrorSys';
import MainRequest from '../../System/MainRequest';

/* базовый класс репозитория с инициализацией системных сервисов */
export default class BaseR {

    public db: any;
    public errorSys: ErrorSys;

    constructor(req: MainRequest) {
        /* инициализируем системные сервисы */
        /* базадынных */
        this.db = сoreDBSys;
        /* сборщик ошибок */
        this.errorSys = req.sys.errorSys;
    }
}