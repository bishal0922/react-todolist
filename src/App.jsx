import { useState, useRef, useEffect } from "react";
import uuid from 'react-uuid';
import TodoList from "./pages/TodoList";

const LOCAL_STORAGE_KEY = 'todoApp.todos'

const App = () => {
  //useRef
  const todoNameRef = useRef()

  //useState
  const [todos, setTodos] = useState([
    {id: 1, name: "Learn React", completed: false},
    {id: 2, name: "Learn Firebase", completed: true},
    {id: 3, name: "Learn GraphQL", completed: false},
  ])

  //useEffect
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  //toggleTodo receives the id from TodoList -> "Todo"
  const toggleTodo = (id) => {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.completed = !todo.completed
    setTodos(newTodos)
  }

  //add a new todo to the array
  const handleAddTodo = () => {
    const name = todoNameRef.current.value

    //if the todo is empty return
    if (name === '') return

    //else add to Todo array
    const newTodo = {id: uuid(), task: name, completed: false}

    setTodos( prevTodos => {
      return [...prevTodos, newTodo]
    })


    todoNameRef.current.value = null
  }

  const handleClearTodo = () => {
    //if the todo is "completed"/ TRUE then !todo.completed = false, hence not kept in the new array
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input type="text" ref={todoNameRef}/>
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodo}>Clear Todo</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;