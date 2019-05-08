import { ResponseSys } from "../System/ResponseSys";
import { UserSys } from "../System/UserSys";
import { ErrorSys } from "../System/ErrorSys";
import MainRequest from "../System/MainRequest";

export default class BaseController {
    public userSys: UserSys;
    public errorSys: ErrorSys;
    public responseSys: ResponseSys;

    constructor(req: MainRequest) {
        // Инициализация системных сервисов
        this.userSys = req.sys.userSys;
        this.errorSys = req.sys.errorSys;
        this.responseSys = req.sys.responseSys;
    }
}
