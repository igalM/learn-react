import { Author } from "./Author";

export interface Article {
    author: Author;
    body: string;
    createdAt: string; // Date?
    description: string;
    favorited: boolean;
    favoritesCount: number;
    slug: string;
    tagList: string[];
    title: string;
    updatedAt: string; // Date?
}

export interface GetArticlesResponse {
    articles: Article[];
    articlesCount: number;
}