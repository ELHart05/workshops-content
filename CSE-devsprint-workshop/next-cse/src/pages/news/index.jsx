import NewsList from "@/components/News/NewsList";

export default function News({
    data
}) {
    return (
        <div className="w-full">
            <div className="text-center w-full text-4xl font-bold px-6 py-14 bg-rose-200">Wall Street Articles here!</div>
            <hr className="h-3 bg-black" />
            <NewsList articles={data.articles} />
        </div>
    );
}

export async function getServerSideProps() {
    const response = await fetch('https://newsapi.org/v2/everything?domains=wsj.com&apiKey='+process.env.NEWS_API_KEY);
    const data = await response.json();
    return {
        props: {
            data
        }
    }
}
