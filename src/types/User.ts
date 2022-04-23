import { LoginUser } from "./LoginUser";

export interface User extends LoginUser {
    bio: string;
    token: string;
    image: string;
}

export interface UserResponse {
    user: User;
}