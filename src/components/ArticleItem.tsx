import { generatePath, useNavigate } from "react-router";
import { Article } from "../types/Article";

type Props = {
    article: Article;
}

export default function ArticleItem({ article }: Props) {

    const navigate = useNavigate();

    const navigateHandler = () => {
        const path = generatePath('/profile/:username', { username: article.author.username });
        navigate(path);
    }

    return <div className="article-preview">
        <div className="article-meta">
            <a onClick={navigateHandler}><img src={article.author.image} /></a>
            <div className="info">
                <a onClick={navigateHandler} className="author">{article.author.username}</a>
                <span className="date">{article.createdAt}</span>
            </div>
            <button className={`btn btn${article.favorited ? '-' : '-outline-'}primary btn-sm pull-xs-right`}>
                <i className="ion-heart"></i>{article.favoritesCount}</button>
        </div>
        {/* this should navigate to article page */}
        <a href="" className="preview-link">
            <h1>{article.title}</h1>
            <p>{article.description}</p>
            <span>Read more...</span>
            <ul className="tag-list">
                {article.tagList.map((tag, index) => <li key={index} className="tag-default tag-pill tag-outline">
                    {tag}
                </li>)}
            </ul>
        </a>
    </div>
}