import axios, { AxiosRequestConfig, Method } from "axios";
import { useState } from "react";

export const useAxios = () => {
    const [response, setResponse] = useState<any>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async ({ url = '', method = 'GET', body = {}, headers = {} }) => {
        setLoading(true);
        const requestConfig: AxiosRequestConfig = {
            url,
            method: method as Method,
            data: body,
            headers,
        }
        try {
            const result = await axios.request(requestConfig);
            setResponse(result.data);
        } catch (error: any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { response, error, loading, fetchData };
};