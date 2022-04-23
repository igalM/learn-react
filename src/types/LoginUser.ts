export interface LoginUser {
    email: string;
    password: string;
}

export interface LoginUserRequest {
    user: LoginUser;
}