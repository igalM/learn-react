import { useQuery } from "react-query";
import axios from "axios";
import { GetArticlesResponse } from "../types/Article";

type Props = {
  limit?: number;
  offset?: number;
  enabled: boolean;
}

export default function useFeedArticles({ limit = 10, offset = 0, enabled = false }: Props) {

  const getMyFeedArticles = async () => {
    const { data } = await axios.get('/articles/feed', { params: { limit, offset } });
    return data;
  };

  return useQuery<GetArticlesResponse, Error>(["feed_articles"], getMyFeedArticles, {
    enabled: enabled,
    refetchOnWindowFocus: false
  });

}