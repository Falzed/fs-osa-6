import { createStore, combineReducers, applyMiddleware } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import messageReducer from './reducers/messageReducer'
import filterReducer from './reducers/filterReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  message: messageReducer,
  anecdotes: anecdoteReducer,
  filter: filterReducer
})
const store = createStore(reducer, applyMiddleware(thunk))

export default store