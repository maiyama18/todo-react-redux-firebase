export const FILTERS = ['all', 'completed', 'uncompleted']

const SET_FILTER = 'SET_FILTER'

export const setFilter = filter => ({
  type: SET_FILTER,
  payload: {
    filter,
  },
})

export const filterInitialState = {
  currentFilter: 'all',
}

export const filterReducer = (state = filterInitialState, action) => {
  switch (action.type) {
  case SET_FILTER:
    return {
      ...state,
      currentFilter: action.payload.filter,
    }
  default:
    return state
  }
}
