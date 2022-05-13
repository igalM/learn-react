export interface User {
    email: string;
    username: string;
    bio: string;
    token: string;
    image: string;
}

export interface UserResponse {
    user: User;
}