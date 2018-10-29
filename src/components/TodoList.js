import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

class TodoList extends Component {
  render() {
    return (
      <div>
        {this.props.todos.map(todo => (
          <div key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            <input type="checkbox" checked={todo.completed}/>
            {todo.title}
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    todos: state.firestore.ordered.todos ? state.firestore.ordered.todos : [],
  }
}
const mapDispatchToProps = {}

export default compose(
  firestoreConnect([{ collection: 'todos' }]),
  connect(mapStateToProps, mapDispatchToProps)
)(TodoList)
