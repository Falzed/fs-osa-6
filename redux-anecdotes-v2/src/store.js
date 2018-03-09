import { createStore, combineReducers } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import messageReducer from './reducers/messageReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  message: messageReducer,
  anecdotes: anecdoteReducer,
  filter: filterReducer
})
const store = createStore(reducer)

export default store