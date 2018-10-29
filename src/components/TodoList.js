import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

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
        {this.props.todos.map(todo => (
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
  return {
    uid: state.firebase.auth.uid,
    todos: state.firestore.ordered.todos ? state.firestore.ordered.todos : [],
  }
}
const mapDispatchToProps = {}

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
