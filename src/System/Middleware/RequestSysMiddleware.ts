import MainRequest from '../MainRequest';


/* Переводит пост в JSON */
export default function RequestSysMiddleware(request: MainRequest, response: any, next: any) {

    let errorSys = request.sys.errorSys;

    errorSys.declare([
        'data'
    ]);

    if (request.method == 'POST') {
        if (request.body['data']) {

            try{
                request.body['data'] = JSON.parse(request.body['data']);
            } catch (e){
                errorSys.errorEx(e, 'data', 'Неправильный формат входных данных');
                request.body['data'] = null;
            }
        }

    }
    next();
}