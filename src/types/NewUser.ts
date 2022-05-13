export interface NewUser {
    username: string;
    password: string;
    email: string;
}

export interface NewUserRequest {
    user: NewUser;
}