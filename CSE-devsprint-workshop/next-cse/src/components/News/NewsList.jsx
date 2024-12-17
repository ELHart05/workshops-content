import NewsItem from "./NewsItem";

export default function NewsList({
    articles
}) {
    return (
        <div className="grid grid-cols-3 p-4">
            {
                articles.map((article, index) => (
                    <NewsItem key={index} article={article} />
                ))
            }
        </div>
    )
}
