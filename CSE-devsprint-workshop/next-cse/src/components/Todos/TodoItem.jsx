import Link from "next/link";

export default function TodoItem({
    todo
}) {
    return (
        <Link href={'/todo/'+todo.id} className="flex flex-col text-center items-center justify-center w-full p-4 border space-y-5">
            <div className="text-2xl font-bold">{todo.title}</div>
            <div className={`
                text-xl
                ${todo.completed ? 'text-green-500' : 'text-red-500'}
            `}>
                {todo.completed ? 'Completed' : 'Not Completed'}
            </div>
        </Link>
    )
}
