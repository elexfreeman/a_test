// Системные сервисы
import { ErrorSys } from '../../System/ErrorSys';
import MainRequest from '../../System/MainRequest';
/**
 * Базовая бизнес модель 
 */
export default class BaseModel {

    public errorSys: ErrorSys;
    public req: MainRequest;

    constructor(req: MainRequest) {
        this.errorSys = req.sys.errorSys;
        this.req = req;
    }

    public async list(): Promise<any> {

    }

    public async getById(): Promise<any> {

    }

    public async create(): Promise<any> {

    }

    public async update(): Promise<any> {

    }

}
