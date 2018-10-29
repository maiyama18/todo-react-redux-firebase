import React from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import AuthButton from './AuthButton'

const App = () => (
  <div>
    <AuthButton />
    <TodoForm />
    <TodoList />
  </div>
)

export default App
