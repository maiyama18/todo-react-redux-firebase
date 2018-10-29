import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from '../../../../../../Library/Caches/typescript/3.1/node_modules/redux'
import { firestoreConnect } from 'react-redux-firebase'

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
      uid: this.props.uid,
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
          <button 
            type="submit" 
            disabled={this.state.requesting || this.state.text.length === 0}
          >Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  uid: state.firebase.auth.uid,
})
const mapDispatchToProps = {}

export default compose(
  firestoreConnect(),
  connect(mapStateToProps, mapDispatchToProps)
)(TodoForm)