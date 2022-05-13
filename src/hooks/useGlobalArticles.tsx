import { useQuery } from "react-query";
import axios from "axios";
import { GetArticlesResponse } from "../types/Article";

type Props = {
    tag?: string;
    author?: string;
    favorited?: string;
    limit?: number;
    offset?: number;
    enabled: boolean;
    queryKey: string;
}

export default function useGlobalArticles({ tag, author, favorited, limit = 10, offset = 0, enabled = false, queryKey }: Props) {

    const getGlobalArticles = async () => {
        const { data } = await axios.get('/articles', { params: { tag, author, favorited, limit, offset } });
        return data;
    };

    return useQuery<GetArticlesResponse, Error>([queryKey], getGlobalArticles, {
        enabled: enabled,
        refetchOnWindowFocus: false
    });

}