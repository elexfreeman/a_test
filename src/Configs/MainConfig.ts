// Тип окружения
export const envType = 'dev';


//Конфигурация базы данных
export const pgDBConfig = {

    client: 'postgres',
    connection: {
        host: "127.0.0.1",
        user: 'postgres',
        password: '123',
        database: 'a_test'
    },
    pool: {min: 0, max: 7},
    acquireConnectionTimeout: 60000
};
