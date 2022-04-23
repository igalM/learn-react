import { useMutation, useQueryClient } from "react-query";
import { LoginUserRequest, LoginUser } from "../types/LoginUser";
import axios from "axios";
import { User, UserResponse } from "../types/User";

export default function useAuth() {
    const queryClient = useQueryClient();

    const login = useMutation(
        async (user: LoginUser) => {
            const req: LoginUserRequest = { user: user };
            const { data } = await axios.post(`${process.env.REACT_APP_API_URI}/users/login`, req);
            return data;
        },
        {
            onSuccess: (userRes: UserResponse) => {
                queryClient.setQueryData('user', userRes.user);
            }
        });

    return { login }
}

