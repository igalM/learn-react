import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ArticlesList from "../../components/ArticlesList";
import TagsList from "../../components/TagsList";
import { useAuthContext } from "../../contexts/auth-context";
import useFeedArticles from "../../hooks/useFeedArticles";
import useGlobalArticles from "../../hooks/useGlobalArticles";
import useTags from "../../hooks/useTags"
import { Article } from "../../types/Article";

export default function HomePage() {
    const { user } = useAuthContext();
    const [activeTab, setActiveTab] = useState<string>('global');
    const [currentArticles, setCurrentArticles] = useState<Article[]>([]);
    const [filterByTag, setFilterByTag] = useState<string>('');
    const navigate = useNavigate();
    const { isLoading: tagsLoading, data: tagsData } = useTags();
    const { isLoading: feedLoading, data: feedArticlesData } = useFeedArticles({ enabled: activeTab === 'my-feed' });
    const { isLoading: globalLoading, data: globalArticlesData } = useGlobalArticles({ enabled: activeTab === 'global', queryKey: 'global_articles' });
    const { isLoading: byTagLoading, data: byTagArticlesData } = useGlobalArticles({ enabled: activeTab === 'tag-articles', tag: filterByTag, queryKey: `#${filterByTag}_articles` });

    const tags = tagsData?.tags || [];
    const feedArticles = feedArticlesData?.articles || [];
    const globalArticles = globalArticlesData?.articles || [];
    const articlesByTag = byTagArticlesData?.articles || [];

    const myFeedHandler = () => {
        if (!user) return navigate('/login');
        setActiveTab('my-feed');
        setFilterByTag('');
    }

    const globalFeedHandler = () => {
        setFilterByTag('');
        setActiveTab('global');
    }

    const articlesByTagHandler = (tag: string) => {
        setActiveTab('tag-articles');
        setFilterByTag(tag);
    }

    useEffect(() => {
        let articles: Article[] = [];
        if (feedArticles || globalArticles) {
            switch (activeTab) {
                case 'my-feed':
                    articles = feedArticles;
                    break;
                case 'global':
                    articles = globalArticles;
                    break;
                case 'tag-articles':
                    articles = articlesByTag;
                    break;
                default:
                    articles = [];
            }
        }
        setCurrentArticles(articles);
    }, [feedArticles, globalArticles, articlesByTag]);

    return (
        <div className="home-page">

            <div className="banner">
                <div className="container">
                    <h1 className="logo-font">conduit</h1>
                    <p>A place to share your knowledge.</p>
                </div>
            </div>

            <div className="container page">
                <div className="row">

                    <div className="col-md-9">
                        <div className="feed-toggle">
                            <ul className="nav nav-pills outline-active">
                                <li className="nav-item">
                                    <a onClick={() => myFeedHandler()} className={`nav-link ${activeTab === 'my-feed' ? 'active' : ''}`}>Your Feed</a>
                                </li>
                                <li className="nav-item">
                                    <a onClick={() => globalFeedHandler()} className={`nav-link ${activeTab === 'global' ? 'active' : ''}`}>Global Feed</a>
                                </li>
                                {filterByTag && <li className="nav-item">
                                    <a className={`nav-link ${activeTab === 'tag-articles' ? 'active' : ''}`}>#{filterByTag}</a>
                                </li>}
                            </ul>
                        </div>
                        <ArticlesList loading={feedLoading || globalLoading || byTagLoading} articles={currentArticles}></ArticlesList>
                    </div>

                    <div className="col-md-3">
                        <TagsList loading={tagsLoading} tags={tags} filterByTag={articlesByTagHandler}></TagsList>
                    </div>

                </div>
            </div>
        </div>
    );
}