import { User } from "./User";

export interface AuthContextType {
    user: User;
    setUser: (user: User) => void;
    logout: () => void;
}