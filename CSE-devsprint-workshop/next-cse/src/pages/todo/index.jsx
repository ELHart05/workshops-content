import TodosList from "@/components/Todos/TodosList";

export default function Todos({
    data
}) {
    return (
        <div className="w-full">
            <div className="text-center w-full text-4xl font-bold px-6 py-14 bg-rose-200">My todos here!</div>
            <hr className="h-3 bg-black" />
            <TodosList todos={data} />
        </div>
    );
}

export async function getServerSideProps() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    return {
        props: {
            data: data.slice(0, 20) // Limit to 20 todos
        }
    }
}
