import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
/* import anecdoteService from './services/anecdotes'

try {
  anecdoteService.getAll().then(anecdotes => {
    store.dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  })
} catch (e) {
  console.log('Could not connect to database')
  store.dispatch({
    type: 'CHANGE_MESSAGE',
    message: 'Could not connect to database'
  })
} */


const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App store={store} />
    </Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)