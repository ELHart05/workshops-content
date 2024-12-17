export default function NewsItem({
    article
}) {
    return (
        <div className="flex flex-col items-center justify-center w-full p-4 border space-y-5">
            <div className="text-2xl font-bold">{article.title}</div>
            <img src={article.urlToImage} alt={article.title} />
            <div className="text-xl">{article.description}</div>
        </div>
    )
}
