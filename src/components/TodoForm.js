import React, { Component } from 'react'
import { connect } from 'react-redux'

class TodoForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      requesting: false,
    }
  }

  async addTodo() {
    this.setState({ requesting: true })
    await this.props.firestore.add({
      collection: 'todos',
    }, {
      title: this.state.text,
      completed: false,
    })
    this.setState({ text: '', requesting: false })
  }

  render() {
    return (
      <div>
        <form onSubmit={e => {e.preventDefault(); this.addTodo()}}>
          <input 
            type="text"
            placeholder="New Todo..."
            value={this.state.text}
            onChange={e => this.setState({ text: e.target.value })}
          />
          <button type="submit" disabled={this.props.requesting}>Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    firestore: state.firestore,
  }
}
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)