// Системные сервисы
import MainRequest from './MainRequest';

import { ErrorSys } from './ErrorSys';

import UserR from "../Infrastructure/Repository/UserR";
import {UserSafeE} from "../Infrastructure/Entity/UserE";

/**
 * Клас который глобально знает все данные пользователя
 */
export class UserSys {

	/* ID пользователя */
	public userId: number; 

	/* Инфо б пользователе */
	public userInfo: UserSafeE; 

	/* флаг авторизации */
	public isAuth: boolean;


	private token: string;
	private userR: UserR;
	private errorSys: ErrorSys;


	public constructor(req: MainRequest) {

		this.errorSys = req.sys.errorSys;

		this.userR = new UserR(req);	

		/* вылавливаем token */
		this.token = req.sys.token;

		if (!this.token) {
			this.token = '';
			this.errorSys.devWarning('token', 'token - пустой');
		}

	}

	/**
	 * Инициализация данных пользователя
	 * тольrо если this.isAuth() == true
	 *
	 * @return void
	 */
	public async init() {
		let ok = this.errorSys.isOk(); // По умолчанию true

		let userInfo: UserSafeE;
		if (ok) { // Получаем информацию о пользователе по apikey
			userInfo = await this.userR.getUserByToken(this.token);

			if (!userInfo) {				
				this.isAuth = false;
				this.errorSys.error('get_user_info_in_auth', 'Не возможно получить данные пользователя при авторизации');
			} else {
				this.userInfo = userInfo;
				this.userId = userInfo['user_id'];
				this.isAuth = true;
			}
		}
	}


	/**
	 * возвращает apikey
	 *
	 * @return string|null
	 */
	public getToken(): string {
		return this.token;
	}

	/**
	 * Получить ID пользователя
	 */
	public getUserId(): number {
		return this.userId;
	}

}
