import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { changeMessage, removeMessage, notify } from '../reducers/messageReducer'
import { connect } from 'react-redux'
import Filter from './Filter'
import anecdoteService from '../services/anecdotes'


class AnecdoteList extends React.Component {

  handleClick = (anecdote) => async () => {

    const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }

    await anecdoteService.update(anecdote.id, newAnecdote)

    this.props.vote(anecdote.id)
    //this.props.store.dispatch(vote(anecdote.id))
    this.props.notify(`you voted '${anecdote.content}'`, 5000)
    /* this.props.store.dispatch(
      changeMessage(`you voted '${anecdote.content}'`)
    ) */
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {this.props.visibleAnecdotes
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

const anecdotesToShow = (anecdotes, filter) => {
  return anecdotes.sort((a, b) => b.votes - a.votes)
    .filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter)
    )
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
}

const mapDispatchToProps = {
  vote,
  changeMessage,
  removeMessage,
  notify
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
