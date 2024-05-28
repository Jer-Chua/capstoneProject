const initialState = {
  userId: null,
  name: null,
  email: null,
  favouriteList: [],
  recommendedBooks: []
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER':
      return state

    case 'UPDATE_USERID':
      return {
        ...initialState,
        userId: action.payload.userId, // Update userId
        email: action.payload.email, // Update email
        name: action.payload.name,
        favouriteList: action.payload.favouriteList,
        recommendedBooks: action.payload.recommendedBooks
      }

    case 'REMOVE_USER':
      return {
        ...initialState,
        userId: null,
        email: null,
        name: null,
        favouriteList: [],
        recommendedBooks: []
      }

    case 'UPDATE_USERBOOKLIST':
      return {
        ...state,
        favouriteList: [...action.payload]
      }

    case 'UPDATE_USERRECOMMEND':
      return {
        ...state,
        recommendedBooks: [...action.payload]
      }

    default:
      return state
  }
}

export const getUser = () => {
  return {
    type: 'GET_USER'
  }
}

export const updateUserId = (userId, email, name, favouriteList, recommendedBooks) => {
  return {
    type: 'UPDATE_USERID',
    payload: {
      userId,
      email,
      name,
      favouriteList,
      recommendedBooks
    }
  }
}

export const removeUser = () => {
  return {
    type: 'REMOVE_USER',
    payload: {}
  }
}

export const updateUserBookList = (bookList) => {
  return {
    type: 'UPDATE_USERBOOKLIST',
    payload: bookList
  }
}

export const updateUserRecommendList = (list) => {
  return {
    type: 'UPDATE_USERRECOMMEND',
    payload: list
  }
}

export default userReducer
