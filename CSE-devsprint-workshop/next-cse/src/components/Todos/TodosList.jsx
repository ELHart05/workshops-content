import TodoItem from "./TodoItem";

export default function TodosList({ todos }) {
    return (
        <div className="grid grid-cols-3 p-4">
            {
                todos.map((todo, index) => (
                    <TodoItem todo={todo} key={index} />
                ))
            }
        </div>
    )
}
