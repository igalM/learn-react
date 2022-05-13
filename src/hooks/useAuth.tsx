import { LoginUser, LoginUserRequest } from "../types/LoginUser";
import { NewUser, NewUserRequest } from "../types/NewUser";
import { useAxios } from "./useAxios";
import { withJWTHeaders } from '../utils/utils';

export default function useAuth() {
    const { response, error, loading, fetchData } = useAxios();

    const signin = async (user: LoginUser) => {
        const body: LoginUserRequest = { user: user };
        await fetchData({ method: 'POST', url: '/users/login', body });
    };

    const signup = async (user: NewUser) => {
        const body: NewUserRequest = { user: user };
        await fetchData({ method: 'POST', url: '/users', body });
    }

    const updateUser = async (user: any) => {
        const body = { user: user };
        await fetchData({ method: 'PUT', url: '/user', body });
    }

    const getUserByToken = async (token: string) => {
        await fetchData({ url: '/user', headers: withJWTHeaders(token) })
    }

    return { signin, signup, updateUser, getUserByToken, response, error, loading };
}