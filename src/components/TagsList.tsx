type Props = {
    loading: boolean;
    tags: string[];
    filterByTag: (tag: string) => void;
}

export default function TagsList({ loading, tags, filterByTag }: Props) {
    if (loading || !tags) {
        return <p>Loading tags...</p>
    }

    const list = tags.map((tag, index) => <a key={index} onClick={() => filterByTag(tag)} className="tag-pill tag-default">{tag}</a>)

    return <div className="sidebar">
        <p>Popular Tags</p>
        <div className="tag-list">
            {list}
        </div>
    </div>
}