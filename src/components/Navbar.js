import React, { useEffect, useState, Fragment } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Dialog, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { updateUserId } from '../reducer/userReducer'

const Navbar = () => {
  const userId = useSelector((state) => state.user.userId)
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    let userInfo = sessionStorage.getItem('userData')
    if (userInfo != null) {
      userInfo = JSON.parse(userInfo)
      dispatch(updateUserId(userInfo.userId, userInfo.email, userInfo.name, userInfo.favouriteList, userInfo.recommendedBooks))
    }
  }, [])
  return (
    <>
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-40" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-in-out duration-500"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in-out duration-500"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                                                <button
                                                    type="button"
                                                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    <span className="absolute -inset-2.5" />
                                                    <span className="sr-only">Close panel</span>
                                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </Transition.Child>
                                        <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                            <div className="px-4 sm:px-6">
                                                <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                                                </Dialog.Title>
                                            </div>
                                            <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                            <ul id="phone-option" className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                <li>
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) =>
                                            `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 
                                        ${isActive ? 'text-orange-700' : 'text-gray-700'} lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                        }
                                        onClick={() => setOpen(false)}
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/explore"
                                        className={({ isActive }) =>
                                            `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 
                                        ${isActive ? 'text-orange-700' : 'text-gray-700'} lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                        }
                                        onClick={() => setOpen(false)}
                                    >
                                        Explore
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/contact"
                                        className={({ isActive }) =>
                                            `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 
                                        ${isActive ? 'text-orange-700' : 'text-gray-700'} lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                        }
                                        onClick={() => setOpen(false)}
                                    >
                                        Contact
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/about"
                                        className={({ isActive }) =>
                                            `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 
                                        ${isActive ? 'text-orange-700' : 'text-gray-700'} lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                        }
                                        onClick={() => setOpen(false)}
                                    >
                                        About Us
                                    </NavLink>
                                </li>
                            <li>
                              { userId === null
                                ? <>
                                        <Link
                                            to="login"
                                            className="block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 text-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0"
                                            onClick={() => setOpen(false)}
                                        >
                                            Log in
                                        </Link>
                                  </>
                                : <Link
                                        id="accountBtn"
                                        to="account"
                                        className="block py-2 pr-4 pl-3 bg-orange-700 rounded-lg text-white duration-200 border-b border-gray-100 text-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-white lg:p-0"
                                        onClick={() => setOpen(false)}
                                    >
                                        Account
                                  </Link>
                              }
                            </li>
                                </ul>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
            </Dialog>
        </Transition.Root>
        <header className="shadow sticky z-30 top-0">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <Link to="/" className="flex items-center">
                            <img
                                src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
                                className="mr-3 h-12"
                                alt="Logo"
                            />
                        </Link>
                        <div className="flex items-center lg:order-2">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            </div>
                            <div className='hidden lg:block'>
                                { userId == null
                                  ? <>
                                        <Link
                                            id="loginButton"
                                            to="login"
                                            className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            to="login"
                                            className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                                        >
                                            Get started
                                        </Link>
                                    </>
                                  : <Link
                                        to="account"
                                        className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                                    >
                                        Account
                                    </Link>
                                }
                            </div>
                            <Bars3Icon id="phone-menu" className="h-6 w-6 lg:hidden xl:hidden 2xl:hidden" aria-hidden="true" onClick={() => setOpen(true)} />
                        </div>

                        <div
                            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                            id="desktop-menu"
                        >
                            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                <li>
                                    <NavLink
                                        id="navHome"
                                        to="/"
                                        className={({ isActive }) =>
                                            `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 
                                        ${isActive ? 'text-orange-700' : 'text-gray-700'} lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                        }
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        id="navExplore"
                                        to="/explore"
                                        className={({ isActive }) =>
                                            `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 
                                        ${isActive ? 'text-orange-700' : 'text-gray-700'} lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                        }
                                    >
                                        Explore
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/contact"
                                        className={({ isActive }) =>
                                            `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 
                                        ${isActive ? 'text-orange-700' : 'text-gray-700'} lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                        }
                                    >
                                        Contact
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/about"
                                        className={({ isActive }) =>
                                            `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 
                                        ${isActive ? 'text-orange-700' : 'text-gray-700'} lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                        }
                                    >
                                        About Us
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
            </nav>
        </header>
    </>
  )
}

export default Navbar
