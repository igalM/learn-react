import { useQuery } from "react-query";
import axios from "axios";

type TagsResponse = {
  tags: string[];
}

const getTags = async () => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URI}/tags`);
  return data;
};

export default function useTags() {
  return useQuery<TagsResponse, Error>("tags", getTags);
}