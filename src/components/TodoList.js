import React, { Component } from 'react'
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import TodoFilter from './TodoFilter'
import { setFilter } from '../redux/filter'

class TodoList extends Component {
  toggleTodo(todo) {
    this.props.firestore.update({ 
      collection: 'todos', 
      doc: todo.id, 
    }, { 
      ...todo,
      completed: !todo.completed,
    })
  }

  deleteTodo(id) {
    this.props.firestore.delete({
      collection: 'todos',
      doc: id,
    })
  }

  render() {
    return (
      <div>
        <TodoFilter 
          currentFilter={this.props.currentFilter} 
          setFilter={this.props.setFilter} 
        />
        {this.props.filteredTodos.map(todo => (
          <div key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            <input 
              type="checkbox" 
              checked={todo.completed}
              onChange={() => this.toggleTodo(todo)}
            />
            {todo.title}
            <button onClick={() => this.deleteTodo(todo.id)}>x</button>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { currentFilter } = state.filter
  const todos = state.firestore.ordered.todos || []
  let filteredTodos
  switch (currentFilter) {
  case 'all':
    filteredTodos = todos
    break
  case 'completed':
    filteredTodos = todos.filter(todo => todo.completed === true)
    break
  case 'uncompleted':
    filteredTodos = todos.filter(todo => todo.completed === false)
    break
  default:
    filteredTodos = todos
  }

  return {
    uid: state.firebase.auth.uid,
    currentFilter,
    filteredTodos, 
  }
}
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    setFilter,
  }, dispatch),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => {
    if (!props.uid) return []
    return [
      {
        collection: 'todos',
        where: [
          ['uid', '==', props.uid],
        ],
      },
    ]
  }),
)(TodoList)
