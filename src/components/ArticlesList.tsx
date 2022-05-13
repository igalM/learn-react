import { Article } from "../types/Article"
import ArticleItem from "./ArticleItem";

type Props = {
    loading: boolean;
    articles: Article[];
}

export default function ArticlesList({ loading, articles }: Props) {
    if (loading) return <p>Loading Articles...</p>
    if (!articles.length) return <p>No articles yet...</p>

    const list = articles.map((article, index) => <ArticleItem key={index} article={article}></ArticleItem>);

    return <>
        {list}
    </>
}