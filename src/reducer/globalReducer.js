const initialState = {
  globalRecommend: []
}

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_GLOBAL':
      return {
        ...state,
        globalRecommend: [...action.payload]
      }

    default:
      return state
  }
}

export const updateGlobalRecommendList = (list) => {
  return {
    type: 'UPDATE_GLOBAL',
    payload: list
  }
}

export default globalReducer
