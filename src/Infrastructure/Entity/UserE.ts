/* юзер с логином и пролем */
export interface UserE {
    user_id: number;
    username: string;  
    login: string;
    pass: string;
}

/* юзер без логина и пароля */
export interface UserSafeE {
    user_id: number;
    username: string;    
}

export interface UserToken {
    id: number;
    token: string;    
    user_id: number;    
    date: string;    
}