import React, { useEffect, useState, Fragment, useRef } from 'react'
import '../css/Explore.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserBookList } from '../reducer/userReducer'
import favouriteUtils from '../Utils/FavouriteUtils'
import UserNotFound from './UserNotFound'

const Explore = () => {
  const { userId, favouriteList } = useSelector((state) => state.user)
  const { globalRecommend } = useSelector((state) => state.global)
  const dispatch = useDispatch()
  const [bookData, setBookData] = useState([])
  const [searchBar, setSearchBar] = useState('')
  const [endPage, setEndPage] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [openFilter, setOpenFilter] = useState(false)
  const cancelButtonRef = useRef(null)
  const [author, setAuthor] = useState('')
  const [language, setLanguage] = useState('')
  const [startYear, setStartYear] = useState('')
  const [endYear, setEndYear] = useState('')
  const [openError, setOpenError] = useState(false)
  const APIKEY = 'AIzaSyCFSgYPDK2FbHEo67ivUmGZFcXAdQ446xs'
  const allLanguage = [
    'en',
    'fr',
    'es',
    'de'
  ]
  useEffect(() => {
    fetchData(currentPage)
  }, [])

  const fetchData = async (index) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=%22%22&maxResults=40&startIndex=${index - 1 === 0 ? 0 : (index - 1) * 40}&key=${APIKEY}`)
      console.log(response)
      if (response.data.items.length !== 40) {
        setEndPage(true)
      } else {
        setEndPage(false)
      }
      setCurrentPage(index)
      setBookData(response.data.items)
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const handleApplyFilters = async (index) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchBar}inauthor:${author}&langRestrict=${language}&publishedDate=${startYear !== '' ? `${startYear}-01-01` : ''}..${endYear !== '' ? `${endYear}-12-31` : ''}&maxResults=40&startIndex=${index - 1 === 0 ? 0 : (index - 1) * 40}&key=${APIKEY}`)
      console.log(response)
      setCurrentPage(index)
      if (response.data.totalItems !== 0) {
        if (response.data.items.length !== 40) {
          setEndPage(true)
        } else {
          setEndPage(false)
        }
        setBookData(response.data.items)
      } else {
        setBookData([])
      }
      setOpenFilter(false)
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  return (
    <>
        <Transition.Root show={openFilter} as={Fragment}>
                <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setOpenFilter}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                                                </svg>

                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    Apply Filters
                                                </Dialog.Title>
                                                <div className="mb-4">
                                                    <label className="text-sm text-gray-500">Author</label>
                                                    <input
                                                        id="authorBar"
                                                        type="text"
                                                        className="w-full p-2 border rounded"
                                                        value={author}
                                                        onChange={(e) => setAuthor(e.target.value)}
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="text-sm text-gray-500">Language</label>
                                                    <select
                                                        className="w-full bg-white p-2 border rounded"
                                                        value={language}
                                                        onChange={(e) => setLanguage(e.target.value)}
                                                    >
                                                        {allLanguage.map((language) => (
                                                            <option key={language} value={language}>
                                                                {language}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="mb-4">
                                                    <label className="text-sm text-gray-500">Publication Year Range</label>
                                                    <div className="flex space-x-2">
                                                        <input
                                                            id="startBar"
                                                            type="text"
                                                            className="w-1/2 p-2 border rounded"
                                                            placeholder="Start Year"
                                                            value={startYear}
                                                            onChange={(e) => setStartYear(e.target.value)}
                                                        />
                                                        <input
                                                            id="endBar"
                                                            type="text"
                                                            className="w-1/2 p-2 border rounded"
                                                            placeholder="End Year"
                                                            value={endYear}
                                                            onChange={(e) => setEndYear(e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            id="filterApplyBtn"
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                                            onClick={() => handleApplyFilters(1)}
                                        >
                                            Apply
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-500 sm:mt-0 sm:w-auto"
                                            onClick={() => setOpenFilter(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
        </Transition.Root>
        <UserNotFound openError={openError} setOpenError={setOpenError}></UserNotFound>
        <div className='contaimx-auto w-full max-w-7xlner'>
                <div id="searchBarWrap">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div id="search">
                            <input id="searchBar" type="search" placeholder="Search" value={searchBar} onChange={(e) => setSearchBar(e.target.value)}></input>
                            <svg id="searchIcon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" onClick={() => handleApplyFilters(1)}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </div>
                        <button className='bg-orange-700' id="filterBtn">
                            <svg id="filterIcon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" style={{ color: 'white' }} onClick={() => setOpenFilter(true)}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5" />
                            </svg>

                        </button>
                    </div>
                </div >
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 lg:py-8">
                    <div className="">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Books from all over the world</h2>

                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {bookData.map((book) => (
                                <>
                                    <div key={book.id} className="relative border-solid border-2 border-grey-300 shadow-lg p-4 rounded-lg">
                                        <Link className='md: h-20' onClick={() => {
                                          window.location.href = 'http://localhost:3000/details/' + book.id
                                        }
                                        }>
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                            {book.volumeInfo.imageLinks !== undefined
                                              ? <img
                                                  src={book.volumeInfo.imageLinks.thumbnail}
                                                  alt={book.volumeInfo.title}
                                                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                                />
                                              : null
                                            }
                                        </div>
                                        <div className="mt-4 flex justify-between">
                                            <div className='w-full'>
                                                    <h3 className="text-sm text-gray-700">
                                                        <span aria-hidden="true" className="absolute" />
                                                        {book.volumeInfo.title}
                                                    </h3>
                                                    <p className="mt-1 text-sm text-gray-500">{book.volumeInfo.publishedDate}</p>
                                                    { globalRecommend.findIndex(indivGlobal => indivGlobal.bookId === book.id) !== -1
                                                      ? <p className="mt-1 text-sm text-gray-500">Recommended by: {globalRecommend[globalRecommend.findIndex(indivGlobal => indivGlobal.bookId === book.id)].numberOfPax} user(s)</p>
                                                      : null
                                                    }
                                            </div>
                                        </div>
                                        </Link>
                                        <div style={{ float: 'right', cursor: 'pointer' }}>
                                            {favouriteList && favouriteList.findIndex(indivBookId => indivBookId === book.id) >= 0
                                              ? <svg id="filledHeart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500" onClick={() => favouriteUtils.removeFavouriteBook(book.id, userId).then((response) => {
                                                dispatch(updateUserBookList(response))
                                              })}>
                                                  <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                                </svg>
                                              : userId != null
                                                ? <svg id="heart" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" onClick={() => favouriteUtils.favouriteBook(book.id, userId).then((response) => {
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

                                </>
                            ))}
                            {bookData.length === 0
                              ? <p className="my-4 text-sm text-gray-500">No result</p>
                              : null}
                        </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                        <div className="flex flex-1 justify-between sm:hidden">
                            <button
                                onClick={currentPage - 1 >= 1 ? () => fetchData(currentPage - 1) : null}
                                className={`${currentPage - 1 >= 1 ? null : 'bg-slate-300'} relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50`}
                            >
                                Previous
                            </button>
                            <button
                                onClick={endPage === false ? () => fetchData(currentPage + 1) : null}
                                className={`${endPage === false ? null : 'bg-slate-300'} relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50`}

                            >
                                Next
                            </button>
                        </div>
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div>
                                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination" id="pagination">
                                    <button
                                        className={`${currentPage - 1 >= 1 ? null : 'bg-slate-300'} relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
                                        onClick={currentPage - 1 >= 1 ? () => fetchData(currentPage - 1) : null}
                                    >
                                        <span className="sr-only">Previous</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                        </svg>

                                    </button>
                                    <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">{currentPage}</span>
                                    <button
                                        className={`${endPage === false ? null : 'bg-slate-300'} relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
                                        onClick={endPage === false ? () => fetchData(currentPage + 1) : null}
                                    >
                                        <span className="sr-only">Next</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                        </svg>

                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

        </div>
    </>
  )
}

export default Explore
