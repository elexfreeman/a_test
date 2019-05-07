/* юзер с логином и пролем */
export interface UserE {
    user_id: number;
    username: string;
    apikey: string;
    login: string;
    password: string;
}

/* юзер без логина и пароля */
export interface UserSafeE {
    user_id: number;
    username: string;
    apikey: string; 
}