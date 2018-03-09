import React from 'react'
import { actionFor } from '../reducers/anecdoteReducer'
import { changeMessage, removeMessage } from '../reducers/messageReducer'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    console.log('handleSubmit')
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.store.dispatch(
      actionFor.anecdoteCreation(content)
    )
    this.props.store.dispatch(
      changeMessage(`you submitted '${content}'`)
    )
    setTimeout(() => {
      this.props.store.dispatch(
        removeMessage()
      )
    }, 5000)
    e.target.anecdote.value = ''
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote' /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default AnecdoteForm
