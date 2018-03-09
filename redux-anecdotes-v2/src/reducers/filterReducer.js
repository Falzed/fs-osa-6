const initialState = ''

export const changeFilter = (filter) => {
  return {
    type: 'CHANGE_FILTER',
    filter
  }
}
const filterReducer = (store = initialState, action) => {
  if (action.type === 'CHANGE_FILTER') {
    return(action.filter)
  }

  return store
}

export default filterReducer