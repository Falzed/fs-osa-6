import React from 'react'
import { actionFor } from '../reducers/anecdoteReducer'
import { changeMessage, removeMessage } from '../reducers/messageReducer'

class AnecdoteList extends React.Component {

  handleClick = (anecdote) => () => {
    this.props.store.dispatch(actionFor.vote(anecdote.id))
    this.props.store.dispatch(
      changeMessage(`you voted '${anecdote.content}'`)
    )
    setTimeout(() => {
      this.props.store.dispatch(
        removeMessage()
      )
    }, 5000)
  }


  render() {
    const anecdotes = this.props.store.getState().anecdotes
    const filter = this.props.store.getState().filter
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes)
          .filter(anecdote =>
            anecdote.content.toLowerCase().includes(filter)
          )
          .map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={this.handleClick(anecdote)}>
                  vote
                </button>
              </div>
            </div>
          )}
      </div>
    )
  }
}

export default AnecdoteList
