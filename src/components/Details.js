import React, { useEffect, useState } from 'react'
import { PaperClipIcon } from '@heroicons/react/20/solid'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserBookList, updateUserRecommendList } from '../reducer/userReducer'
import { updateGlobalRecommendList } from '../reducer/globalReducer'
import favouriteUtils from '../Utils/FavouriteUtils'
import UserNotFound from './UserNotFound'
import RecommendedUtil from '../Utils/RecommendedUtil'

const Details = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { globalRecommend } = useSelector((state) => state.global)
  const { userId, recommendedBooks, favouriteList } = useSelector((state) => state.user)
  const APIKEY = 'AIzaSyCFSgYPDK2FbHEo67ivUmGZFcXAdQ446xs'
  const [openError, setOpenError] = useState(false)
  const [bookObject, setBookObject] = useState(null)
  const fetchBookData = async () => {
    try {
      const bookData = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}?key=${APIKEY}`)
      if (bookData.status === 200) {
        console.log(bookData)
        setBookObject(bookData.data)
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  useEffect(() => {
    fetchBookData()
  }, [])
  return (
    bookObject &&
    <>
      <UserNotFound openError={openError} setOpenError={setOpenError}></UserNotFound>
      <div className='p-10'>
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">Book Information</h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">All Details on {bookObject.volumeInfo.title}</p>
          {globalRecommend.findIndex(indivGlobal => indivGlobal.bookId === bookObject.id) !== -1
            ? <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Recommended by: {globalRecommend[globalRecommend.findIndex(indivGlobal => indivGlobal.bookId === bookObject.id)].numberOfPax} user(s)</p>
            : null}
        </div>
        <div className="px-4 py-6 flex justify-end">
          {favouriteList && bookObject && favouriteList.findIndex(indivBookId => indivBookId === bookObject.id) >= 0
            ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500 cursor-pointer" onClick={() => {
              favouriteUtils.removeFavouriteBook(bookObject.id, userId).then((response) => {
                dispatch(updateUserBookList(response))
              })
            }}>
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
            : userId != null
              ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer" onClick={() => favouriteUtils.favouriteBook(bookObject.id, userId).then((response) => {
                dispatch(updateUserBookList(response))
              })}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
              : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer" onClick={() => setOpenError(true)}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
          }
          {recommendedBooks && bookObject && recommendedBooks.findIndex(indivBookId => indivBookId === bookObject.id) >= 0
            ? <svg id="removeRecommend" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mx-5 text-yellow-400" onClick={() => RecommendedUtil.removeRecommendBook(bookObject.id, userId).then(({ userRecommend, gloablRecommend }) => {
              dispatch(updateUserRecommendList(userRecommend))
              dispatch(updateGlobalRecommendList(gloablRecommend))
            })}>
              <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
            </svg>
            : userId != null
              ? <svg id="addRecommend" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-5" onClick={() => RecommendedUtil.recommendBook(bookObject.id, userId).then(({ userRecommend, gloablRecommend }) => {
                dispatch(updateUserRecommendList(userRecommend))
                dispatch(updateGlobalRecommendList(gloablRecommend))
              })}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
              </svg>
              : <svg id="noRecommend" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-5" onClick={() => setOpenError(true)}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
              </svg>
          }

        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className='md:flex'>
              <div className='md:w-1/2 p-4'>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75">
                  { bookObject.volumeInfo.imageLinks !== undefined
                    ? <img
                    src={bookObject.volumeInfo.imageLinks.thumbnail}
                    alt={bookObject.volumeInfo.title}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                    : <p>{bookObject.volumeInfo.title}</p>
                  }
                </div>
              </div>
              <div className='md:w-1/2 p-4'>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Title</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{bookObject.volumeInfo.title}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Language</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{bookObject.volumeInfo.language}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Published Date</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{bookObject.volumeInfo.publishedDate}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Publisher</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{bookObject.volumeInfo.publisher}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Description</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" dangerouslySetInnerHTML={{ __html: bookObject.volumeInfo.description }} >

                  </dd>
                </div>
              </div>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Publication</dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                  <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                      <div className="ml-4 flex min-w-0 flex-1 gap-2">
                        <span className="truncate font-medium">{bookObject.volumeInfo.title}.pdf</span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      {console.log(bookObject)}
                      <a href={bookObject.volumeInfo.infoLink} className="font-medium text-indigo-600 hover:text-indigo-500" target="_blank" rel="noopener noreferrer">
                        Purchase
                      </a>

                    </div>
                  </li>
                </ul>
              </dd>
            </div>

          </dl>
        </div>
      </div>
    </>
  )
}

export default Details
