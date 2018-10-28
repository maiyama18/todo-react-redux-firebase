import React, { Component } from 'react'
import { connect } from 'react-redux'

class TodoList extends Component {
  componentDidMount() {
    this.props.firestore.onSnapshot({ collection: 'todos' })
  }

  render() {
    return (
      <div>
        {this.props.todos.map(todo => (
          <div key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.title}
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    firestore: state.firestore,
    todos: state.firestore.ordered.todos ? state.firestore.ordered.todos : [],
  }
}
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
