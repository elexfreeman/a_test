
import configSys from './ConfigSys';

import { ErrorSys } from './ErrorSys';
import MainRequest from './MainRequest';

/**
 * Системный сервис формирования ответа
 */
export class ResponseSys {
	private env: string;
	private bDevMode: boolean;

	private errorSys: ErrorSys;

	constructor(req: MainRequest) {

		/* какой сейчас редим работы? */
		this.env = configSys.getEnvType();
		if (this.env == 'local' || this.env == 'dev') {
			this.bDevMode = true;
		} else {
			this.bDevMode = false;
		}

		this.errorSys = req.sys.errorSys;

	}

	/**
	 * Формирование ответа клиенту
	 *
	 * @param array|null data
	 * @param string sMsg
	 * @return array
	 */
	public response(data: any, sMsg: string): any {

		let out: any = {
			'ok': this.errorSys.isOk(),
			'errors': this.errorSys.getErrors(),
			// 'warning' : this.errorSys.getWarning(), // Временно убраны пользовательские предупреждения
			// 'notice' : this.errorSys.getNotice(), // Временно убраны пользовательские предупреждения
			'msg': sMsg,
		};

		if (this.bDevMode) { // Выводит информацию для разработчиков и тестрировщиков
			out['dev_warning'] = this.errorSys.getDevWarning();
			out['dev_notice'] = this.errorSys.getDevNotice();
			out['dev_declare'] = this.errorSys.getDevDeclare();
			out['dev_log'] = this.errorSys.getDevLog();
		}

		if (this.errorSys.isOk()) {
			out['data'] = data;
		} else {
			out['data'] = null;
			out['msg'] = 'Что то пошло не так - обратитесь к администратору';
		}

		return out;
	}
}
