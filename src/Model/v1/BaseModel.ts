// Системные сервисы
import { ErrorSys } from '../../System/ErrorSys';
import MainRequest from '../../System/MainRequest';
/**
 * Базовая бизнес модель 
 */
export default class BaseModel { 

    public errorSys: ErrorSys;

    constructor(req: MainRequest) {
        this.errorSys = req.sys.errorSys;
       
    }



}
