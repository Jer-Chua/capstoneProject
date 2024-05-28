import axios from 'axios'

const RecommendedUtil = {
  recommendBook: async (bookId, userId) => {
    try {
      const response = await axios.put('http://localhost:3001/addRecommend', {
        id: userId,
        bookId
      })
      const userInfo = {
        email: response.data.user.email,
        favouriteList: response.data.user.favouriteList,
        name: response.data.user.name,
        recommendedBooks: response.data.user.recommendedBooks,
        userId: response.data.user._id
      }
      sessionStorage.setItem('userData', JSON.stringify(userInfo))
      console.log(response)
      return {
        userRecommend: response.data.user.recommendedBooks,
        gloablRecommend: response.data.global.globalRecommendation
      }
    } catch (err) {
      console.error(err)
      throw err
    }
  },
  removeRecommendBook: async (bookId, userId) => {
    try {
      const response = await axios.put('http://www.localhost:3001/removeRecommend', {
        id: userId,
        bookId
      })
      const userInfo = {
        email: response.data.user.email,
        favouriteList: response.data.user.favouriteList,
        name: response.data.user.name,
        recommendedBooks: response.data.user.recommendedBooks,
        userId: response.data.user._id
      }
      sessionStorage.setItem('userData', JSON.stringify(userInfo))
      console.log(response)
      return {
        userRecommend: response.data.user.recommendedBooks,
        gloablRecommend: response.data.global.globalRecommendation
      }
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}

export default RecommendedUtil
