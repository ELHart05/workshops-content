export default function Todo({
    data
}) {
    return (
        <div className="w-full flex flex-col flex-1">
            <div className="text-center w-full text-4xl font-bold px-6 py-14 bg-rose-200">{data.title} - {data.id}</div>
            <hr className="h-3 bg-black" />
            <div className="flex-1 flex p-4">
                <div className="flex flex-col text-center items-center justify-center w-full p-4 border space-y-5">
                    <div className="text-2xl font-bold">{data.title}</div>
                    <div className={`
                        text-xl
                        ${data.completed ? 'text-green-500' : 'text-red-500'}
                    `}>
                        {data.completed ? 'Completed' : 'Not Completed'}
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function getStaticPaths() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    const paths = data.slice(0, 20).map(todo => ({
        params: { id: todo.id.toString() }
    }));
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps ({ params }) {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/'+params.id);
    const data = await response.json();
    return {
        props: {
            data
        },
        // revalidate: 60, Next.js will invalidate the cache when a request comes in, at most once every 60 seconds.
    }
}
