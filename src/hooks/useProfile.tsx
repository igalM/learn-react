import axios from "axios";
import { useQuery } from "react-query";
import { ProfileResponse } from "../types/Profile";

type Props = {
    enabled: boolean;
    username: string;
}

export default function useProfile({ enabled, username }: Props) {
    const getProfile = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URI}/profiles/${username}`);
        return data;
    };

    return useQuery<ProfileResponse, Error>(["profile"], getProfile, {
        enabled: enabled,
        refetchOnWindowFocus: false
    });
}