import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../Images/logo.png'


function Navbar() {
    let navigate = useNavigate();
    let location = useLocation()
    const [toggle, setToggle] = useState(false);
    const [burger, setBurger] = useState(false);
    const handleToggle = () => {
        setToggle(!toggle)
    };
    let handleSignout = () => {
        Cookies.remove('authtoken')
        Cookies.remove('name')
        Cookies.remove('email')
        Cookies.remove('dp')
        setToggle(false)
        navigate('/')
    }

    let handleCreateBlog = async () => {
        setToggle(false)
        navigate('/createblog');
    }

    return (

        <>
            {
                location.pathname == '/login' || location.pathname == '/signup' ?
                    <></>
                    :
                    <div className='relative'>
                        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
                            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                                <Link to="/" className="flex items-center">
                                    <img src={logo} className="h-8 mr-3 rounded-full" alt="Flowbite Logo" />
                                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white ">Bytecode</span>
                                </Link>
                                {!Cookies.get('authtoken') ?
                                    <div className="flex md:order-2 ">
                                        <Link to='/signup' className='hidden sm:block'>
                                            <div className="mx-2">
                                                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Signup</button>
                                            </div>
                                        </Link>
                                        <Link to='/login' className='hidden sm:block'>
                                            <div>
                                                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">login</button>
                                            </div>
                                        </Link>
                                        <div onClick={()=>setBurger(!burger)} class="flex md:order-2">
                                            <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                                                <span class="sr-only">Open main menu</span>
                                                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    :
                                    <div className=" md:order-2" >
                                        <div >
                                            <button type="button" class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" onClick={handleToggle} >
                                                <img class="w-9 h-9 rounded-full" src={Cookies.get('dp')} alt="user photo" />
                                            </button>
                                        </div>

                                        {
                                            toggle &&
                                            <>
                                                <div class="z-50 w-[10vw] absolute my-4  text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                                                    <div class="px-4 py-3">
                                                        <span class="block text-sm text-gray-900 dark:text-white">{Cookies.get('name')}</span>
                                                        <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">{Cookies.get('email')}</span>
                                                    </div>
                                                    <ul class="py-2" >
                                                        <li>
                                                            <div class="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={handleCreateBlog}>Create Blog</div>
                                                        </li>
                                                    </ul>
                                                    <ul class="py-2" >
                                                        <li>
                                                            <div class="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={handleSignout}>Sign out</div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </>
                                        }
                                    </div>

                                }
                                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                        <li>
                                            <Link to="/problems" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Problems</Link>
                                        </li>
                                        <li>
                                            <Link to="/contest" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contest</Link>
                                        </li>
                                
                                        <li>
                                            <Link to='/contact'>
                                                <div className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact
                                                </div>
                                            </Link>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </nav>
                       {burger&& <div className='absolute  z-40 '>
                            <ul className="w-[100vw] p-4  font-medium border border-gray-100 rounded-lg bg-gray-50  dark:bg-gray-800  dark:border-gray-700">
                                        <li>
                                            <Link to="/problems" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Problems</Link>
                                        </li>
                                        <li>
                                            <Link to="/contest" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contest</Link>
                                        </li>
                                        <li>
                                            <Link to='/contact'>
                                                <div className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact
                                                </div>
                                            </Link>
                                        </li>

                                </ul>
                        </div>}
                    </div>
            }
        </>
    )
}

export default Navbar