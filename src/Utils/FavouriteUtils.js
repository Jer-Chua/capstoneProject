import axios from 'axios'

const FavouriteUtils = {
  favouriteBook: async (bookId, userId) => {
    try {
      const response = await axios.put('http://localhost:3001/addFavourite', {
        id: userId,
        bookId
      })
      let userInfo = sessionStorage.getItem('userData')
      userInfo = JSON.parse(userInfo)
      userInfo.favouriteList = response.data.favouriteList
      sessionStorage.setItem('userData', JSON.stringify(userInfo))
      return response.data.favouriteList
    } catch (err) {
      console.error(err)
      throw err
    }
  },
  removeFavouriteBook: async (bookId, userId) => {
    try {
      const response = await axios.put('http://www.localhost:3001/removeFavourite', {
        id: userId,
        bookId
      })
      let userInfo = sessionStorage.getItem('userData')
      userInfo = JSON.parse(userInfo)
      userInfo.favouriteList = response.data.favouriteList
      sessionStorage.setItem('userData', JSON.stringify(userInfo))
      return response.data.favouriteList
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}

export default FavouriteUtils
