import { useState, useRef, useEffect } from 'react'
import TodoList from './pages/TodoList'
import {uuid} from 'uuidv4'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([
    {id: 1, name: "Learn React", completed: false},
    {id: 2, name: "Learn Firebase", completed: false},
    {id: 3, name: "Learn GraphQL", completed: false},
  ])
  const todoNameRef = useRef()

  // storing todos in local storage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  // saving todos in local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const toggleTodo = (id) => {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.completed = !todo.completed
    setTodos(newTodos)
  }


  const handleAddTodo = () => {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuid(), task: name, completed: false}]
    })
    todoNameRef.current.value = null // clear the input
  }

  const handleClearTodos = () => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  return (
    <>
    <TodoList todos={tasks} toggleTodo={toggleTodo}/>
    <input ref={todoNameRef} type="text"/>
    <button onClick={handleAddTodo}>Clear Complete</button>
    <button onClick={handleClearTodos}>Clear Complete</button>
    <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App
