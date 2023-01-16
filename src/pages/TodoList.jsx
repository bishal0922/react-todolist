import Todo from "./Todo"

const TodoList = ({todos, toggleTodo}) => {
    return (
        <div>
            {todos.map ( (t) => {
                return <Todo key={t.id} todo={t} toggleTodo={toggleTodo}/>
            })}
        </div>
    )
}

export default TodoList