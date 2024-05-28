import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { updateGlobalRecommendList } from '../reducer/globalReducer'
import { removeUser, updateUserBookList, updateUserRecommendList } from '../reducer/userReducer'
import favouriteUtils from '../Utils/FavouriteUtils'
import RecommendedUtil from '../Utils/RecommendedUtil'

const Account = () => {
  const { userId, name, email, favouriteList, recommendedBooks } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [fullDataFavouriteList, setFullDataFavouriteList] = useState([])
  const [fullDataRecommendedList, setFullDataRecommendedList] = useState([])

  useEffect(() => {
    if (userId === null || userId === undefined) {
      navigate('/')
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [])

  useEffect(() => {
    if (favouriteList !== undefined) {
      fetchAllDataFavourite()
    }
  }, [favouriteList])

  useEffect(() => {
    if (recommendedBooks !== undefined) {
      fetchAllDataRecommended()
    }
  }, [recommendedBooks])

  const fetchAllDataFavourite = async () => {
    const updatedFullDataFavouriteList = []
    for (let i = 0; i < favouriteList.length; i++) {
      const result = await fetchFullData(favouriteList[i])
      console.log(result)
      updatedFullDataFavouriteList.push(result)
    }
    console.log(updatedFullDataFavouriteList)
    setFullDataFavouriteList(updatedFullDataFavouriteList)
  }

  const fetchAllDataRecommended = async () => {
    const udpatedFullDataRecommendedList = []
    for (let i = 0; i < recommendedBooks.length; i++) {
      const result = await fetchFullData(recommendedBooks[i])
      console.log(result)
      udpatedFullDataRecommendedList.push(result)
    }
    console.log(udpatedFullDataRecommendedList)
    setFullDataRecommendedList(udpatedFullDataRecommendedList)
  }

  const fetchFullData = async (id) => {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`)
    // console.log(response.data);
    return response.data
  }

  const logout = () => {
    sessionStorage.removeItem('userData')
    dispatch(removeUser)
    window.location.reload()
  }
  return (
    <div className="min-h-screen bg-slate-50 py-4 flex flex-col items-center justify-center">
      <div className="bg-slate-100 my-2 rounded-lg shadow-lg p-6 w-11/12">

        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        <p className="text-gray-600">Email: {email}</p>

        {/* Logout Button */}
        <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={logout}>
          Logout
        </button>
      </div>
      <div className="bg-slate-100 my-2 rounded-lg shadow-lg p-6 w-11/12">
        <div className="mt-1">
          <h3 className="font-semibold text-black">Favorite Books</h3>
          <ul role="list" className="divide-y divide-gray-100">
            {fullDataFavouriteList && fullDataFavouriteList.map((indivBook) => (
              <li key={indivBook.id} className="flex justify-between gap-x-6 py-5">
                <Link to={`/details/${indivBook.id}`}>
                  <div className="flex min-w-0 gap-x-4">
                    <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={indivBook.volumeInfo.imageLinks.thumbnail} alt="" />
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">{indivBook.volumeInfo.title}</p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">{indivBook.volumeInfo.publisher}</p>
                      <div className="min-w-0 flex-auto md:hidden lg:hidden xl:hidden 2xl:hidden">
                        <p className="text-sm leading-6 text-gray-900">{indivBook.volumeInfo.publishedDate}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500" onClick={() => favouriteUtils.removeFavouriteBook(indivBook.id, userId)
                          .then((response) => {
                            dispatch(updateUserBookList(response))
                          })}>
                          <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">{indivBook.volumeInfo.publishedDate}</p>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500" onClick={() => favouriteUtils.removeFavouriteBook(indivBook.id, userId)
                    .then((response) => {
                      dispatch(updateUserBookList(response))
                    })}>
                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                  </svg>
                </div>
              </li>
            ))}
            {fullDataFavouriteList.length === 0
              ? <li key="No Favourite" className="flex justify-between gap-x-6 py-5">
                <p className="leading-6 text-gray-900">No favourite book</p>
              </li>
              : null}
          </ul>
        </div>
      </div>
      <div className="bg-slate-100 my-2 rounded-lg shadow-lg p-6 w-11/12">
        <div className="mt-1">
          <h3 className="font-semibold text-black">Recommended Books</h3>
          <ul className="divide-y divide-gray-100">
            {fullDataRecommendedList && fullDataRecommendedList.map((indivBook) => (
              <li key={indivBook.id} className="flex justify-between gap-x-6 py-5">
                <Link to={`/details/${indivBook.id}`}>
                  <div className="flex min-w-0 gap-x-4">
                    <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={indivBook.volumeInfo.imageLinks.thumbnail} alt="" />
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">{indivBook.volumeInfo.title}</p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">{indivBook.volumeInfo.publisher}</p>
                      <div className="min-w-0 flex-auto md:hidden lg:hidden xl:hidden 2xl:hidden">
                  <p className="text-sm leading-6 text-gray-900">{indivBook.volumeInfo.publishedDate}</p>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-yellow-400" onClick={() => RecommendedUtil.removeRecommendBook(indivBook.id, userId).then(({ userRecommend, gloablRecommend }) => {
                    dispatch(updateUserRecommendList(userRecommend))
                    dispatch(updateGlobalRecommendList(gloablRecommend))
                  })}>
                    <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                  </svg>
                </div>
                    </div>
                  </div>
                </Link>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">{indivBook.volumeInfo.publishedDate}</p>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-yellow-400" onClick={() => RecommendedUtil.removeRecommendBook(indivBook.id, userId).then(({ userRecommend, gloablRecommend }) => {
                    dispatch(updateUserRecommendList(userRecommend))
                    dispatch(updateGlobalRecommendList(gloablRecommend))
                  })}>
                    <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                  </svg>
                </div>
              </li>
            ))}
            {fullDataRecommendedList.length === 0
              ? <li key="No Recommended" className="flex justify-between gap-x-6 py-5">
                <p className="leading-6 text-gray-900">No recommended book</p>
              </li>
              : null}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Account
