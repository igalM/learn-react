import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArticlesList from "../../components/ArticlesList";
import { useAuthContext } from "../../contexts/auth-context";
import useGlobalArticles from "../../hooks/useGlobalArticles";
import useProfile from "../../hooks/useProfile";
import { Article } from "../../types/Article";
import { Profile } from "../../types/Profile";

export default function ProfilePage() {
    const params = useParams();
    const { user } = useAuthContext();
    const [activeTab, setActiveTab] = useState<string>('my-articles');
    const [currentArticles, setCurrentArticles] = useState<Article[]>([]);
    const { data } = useProfile({ enabled: user.username !== params.username, username: params.username!! });
    const { isLoading: myArticlesLoading, data: myArticlesData } = useGlobalArticles({ enabled: !!params.username, author: params.username, queryKey: `${params.username}_articles` });
    const { isLoading: favoritedArticlesLoading, data: favoritedArticlesData } = useGlobalArticles({ enabled: !!params.username && activeTab === 'favorited-articles', favorited: params.username, queryKey: `${params.username}_favorited_articles` });

    const myArticles = myArticlesData?.articles || []
    const favoritedArticles = favoritedArticlesData?.articles || []

    let profileData: Profile = null!;

    if (data?.profile) {
        profileData = data?.profile;
    }

    let actionButton = <button className="btn btn-sm btn-outline-secondary action-btn">
        <i className="ion-plus-round"></i>
        Follow {params.username}
    </button>;

    if (user.username === params.username) {
        profileData = {
            username: user.username,
            bio: user.bio,
            image: user.image,
            following: false
        };
        actionButton = <a className="btn btn-sm btn-outline-secondary action-btn" href="/settings">
            <i className="ion-gear-a"></i> Edit Profile Settings
        </a>
    }

    const myArticlesHandler = () => {
        setActiveTab('my-articles');
    }

    const favoritedArticlesHandler = () => {
        setActiveTab('favorited-articles');
    }

    useEffect(() => {
        let articles: Article[] = [];
        if (myArticles || favoritedArticles) {
            switch (activeTab) {
                case 'my-articles':
                    articles = myArticles;
                    break;
                case 'favorited-articles':
                    articles = favoritedArticles;
                    break;
                default:
                    articles = [];
            }
        }
        setCurrentArticles(articles);
    }, [myArticles, favoritedArticles]);

    return (
        <div className="profile-page">
            <div className="user-info">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-10 offset-md-1">
                            <img src={profileData.image} className="user-img" />
                            <h4>{profileData.username}</h4>
                            <p>{profileData.bio}</p>
                            {actionButton}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">

                    <div className="col-xs-12 col-md-10 offset-md-1">
                        <div className="articles-toggle">
                            <ul className="nav nav-pills outline-active">
                                <li className="nav-item">
                                    <a onClick={myArticlesHandler} className={`nav-link ${activeTab === 'my-articles' ? 'active' : ''}`}>My Articles</a>
                                </li>
                                <li className="nav-item">
                                    <a onClick={favoritedArticlesHandler} className={`nav-link ${activeTab === 'favorited-articles' ? 'active' : ''}`}>Favorited Articles</a>
                                </li>
                            </ul>
                        </div>
                        <ArticlesList articles={currentArticles} loading={myArticlesLoading || favoritedArticlesLoading}></ArticlesList>
                    </div>
                </div>
            </div>
        </div>
    );
}