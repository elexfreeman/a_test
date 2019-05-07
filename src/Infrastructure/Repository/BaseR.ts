
// Глобальные сервисы
import сoreDBSys from '../../System/CoreDBSys';

// Системные сервисы
import { ErrorSys } from '../../System/ErrorSys';
import MainRequest from '../../System/MainRequest';

/* базовый класс репозитория с инициализацией системных сервисов */
export default class BaseR {

    private db: any;
    private errorSys: ErrorSys;

    constructor(req: MainRequest) {
        /* инициализируем системные сервисы */
        this.db = сoreDBSys;
        this.errorSys = req.sys.errorSys;
    }
}