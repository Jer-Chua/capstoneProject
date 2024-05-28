import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateUserBookList } from '../reducer/userReducer'
import UserNotFound from './UserNotFound'
import favouriteUtils from '../Utils/FavouriteUtils'
import axios from 'axios'
const Home = () => {
  const { globalRecommend } = useSelector((state) => state.global)
  const { userId, favouriteList } = useSelector((state) => state.user)
  const [openError, setOpenError] = useState(false)
  const [fullDataRecommendedList, setFullDataRecommendedList] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
    fetchAllDataRecommended()
  }, [globalRecommend])
  const fetchAllDataRecommended = async () => {
    const udpatedFullDataRecommendedList = [...fullDataRecommendedList]
    for (let i = 0; i < globalRecommend.length; i++) {
      if (i >= 3) {
        break
      }
      const result = await fetchFullData(globalRecommend[i].bookId)
      console.log(result)
      const newResult =
      {
        ...result,
        numberOfPax: globalRecommend[i].numberOfPax
      }
      udpatedFullDataRecommendedList.push(newResult)
    }
    console.log(udpatedFullDataRecommendedList)
    setFullDataRecommendedList(udpatedFullDataRecommendedList)
  }

  const fetchFullData = async (id) => {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`)
    // console.log(response.data);
    return response.data
  }
  return (
    <>
    <UserNotFound openError={openError} setOpenError={setOpenError}></UserNotFound>
    <div className="mx-auto w-full max-w-7xl">
      <aside className="relative overflow-hidden text-black rounded-lg sm:mx-16 mx-2 sm:py-16">
        <div className="relative z-10 max-w-screen-xl px-4  pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8">
          <div className="max-w-xl sm:mt-1 mt-80 space-y-8 text-center sm:text-right sm:ml-auto">
            <h2 className="text-4xl font-bold sm:text-5xl">
              Download Now
              <span className="hidden sm:block text-4xl">Lorem Ipsum</span>
            </h2>

            <Link
              className="inline-flex text-white items-center px-6 py-3 font-medium bg-orange-700 rounded-lg hover:opacity-75"
              to="/"
            >
              <svg
                fill="white"
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
              >
                <path d="M1.571 23.664l10.531-10.501 3.712 3.701-12.519 6.941c-.476.264-1.059.26-1.532-.011l-.192-.13zm9.469-11.56l-10.04 10.011v-20.022l10.04 10.011zm6.274-4.137l4.905 2.719c.482.268.781.77.781 1.314s-.299 1.046-.781 1.314l-5.039 2.793-4.015-4.003 4.149-4.137zm-15.854-7.534c.09-.087.191-.163.303-.227.473-.271 1.056-.275 1.532-.011l12.653 7.015-3.846 3.835-10.642-10.612z" />
              </svg>
              &nbsp; Download now
            </Link>
          </div>
        </div>

        <div className="absolute inset-0 w-full sm:my-20 sm:pt-1 pt-12 h-full ">
          <img className="w-96" src="https://i.ibb.co/5BCcDYB/Remote2.png" alt="image1" />
        </div>
      </aside>

      <div className="py-16">
        <div className="container m-auto px-6 text-gray-500 md:px-12 xl:px-0">
          <p className='font-semibold text-black'>Best Recommendation</p>
          <div className="grid gap-6 lg:grid-cols-3">
            {fullDataRecommendedList.length > 0
              ? fullDataRecommendedList.map((indivRecommend) => (
                <div className="my-4 border-solid border-2 border-grey-300 shadow-lg p-4 rounded-lg lg:col-span-1" key={indivRecommend.id}>
                  <div className="relative">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                      {indivRecommend.volumeInfo.imageLinks !== undefined
                        ? <img
                          key={indivRecommend.volumeInfo.imageLinks.thumbnail}
                          src={indivRecommend.volumeInfo.imageLinks.thumbnail}
                          alt={indivRecommend.volumeInfo.title}
                          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                        : null}
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div className='w-full'>
                        <Link className='md: h-20' to={'http://localhost:3000/details/' + indivRecommend.id}>
                          <h3 className="text-sm text-gray-700">
                            <span aria-hidden="true" className="absolute" />
                            {indivRecommend.volumeInfo.title}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">{indivRecommend.volumeInfo.publishedDate}</p>
                          <p className="mt-1 text-sm text-gray-500">Recommended by: {indivRecommend.numberOfPax} user(s)</p>
                        </Link>
                      </div>
                    </div>
                    <div style={{ float: 'right', cursor: 'pointer' }}>
                      {favouriteList && favouriteList.findIndex(indivBookId => indivBookId === indivRecommend.id) >= 0
                        ? <svg id="filledHeart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500" onClick={() => favouriteUtils.removeFavouriteBook(indivRecommend.id, userId).then((response) => {
                          dispatch(updateUserBookList(response))
                        })}>
                          <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                        </svg>
                        : userId != null
                          ? <svg id="heart" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" onClick={() => favouriteUtils.favouriteBook(indivRecommend.id, userId).then((response) => {
                            dispatch(updateUserBookList(response))
                          })}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                          </svg>
                          : <svg id="noAccountHeart" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" onClick={() => setOpenError(true)}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                          </svg>
                      }
                    </div>
                  </div>
                </div>
              ))
              : <p className='text-grey-500 mt-5'>There is no recommend books available</p>}
          </div>
        </div>
      </div>

    </div>
    </>
  )
}

export default Home
