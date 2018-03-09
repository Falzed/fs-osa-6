const initialState = 'Test message'

const messageReducer = (state = initialState, action) => {
  if (action.type === 'SET_MESSAGE') {
    return action.message
  }
  return state
}

export const changeMessage = (message) => {
  return {
    type: 'SET_MESSAGE',
    message
  }
}

export const removeMessage = () => {
  return {
    type: 'SET_MESSAGE',
    message: ''
  }
}

export default messageReducer