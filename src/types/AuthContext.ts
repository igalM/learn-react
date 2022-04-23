import { LoginUser } from "./LoginUser";
import { User } from "./User";

export interface AuthContextType {
    user: User;
    signin: (user: LoginUser) => void;
    signup: () => void;
    logout: () => void;
}