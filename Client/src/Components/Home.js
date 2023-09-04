import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


function Home(props) {
    const [articles, setArticles ] = useState([]);
    const [dupArticle, setdupArticle] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    let onHandleChange = (e)=>{
        setSearchTerm(e.target.value)
    }
    let onHandleSearch = (e)=>{
        e.preventDefault();
        if ( searchTerm === "" ){
            setArticles(dupArticle)
            return;
        }
        const regex = new RegExp(searchTerm, "i");
        const matchingTitles = dupArticle.filter( (e) => {
            return regex.test(e.heading)
        });
        console.log(matchingTitles);
        setArticles(matchingTitles);
    }

    let getArticles = async () => {
        try {
            const response = await axios.get(`${props.HOST}/blog/allblog`)
            // console.log(response.data)
            setArticles(response.data);
            setdupArticle(response.data);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getArticles();
    }, [])
    return (
        <>
            <section className="mt-[9.8vh] min-h-[90vh] bg-white dark:bg-gray-900">
                <div className='pt-[100px] w-[50%] mx-[25%]' >
                    <form>
                        <label for=" default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required  onChange={onHandleChange}/>
                            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={onHandleSearch}>Search</button>
                        </div>
                    </form>
                </div>
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                        <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Our Blog</h2>
                        <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">We use an agile approach to test assumptions and connect with the needs of your audience early and often.</p>
                    </div>
                    <div className="grid gap-8 ">
                        {
                            articles.map((e) => {
                                return (
                                    <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                                        <div className="flex justify-between items-center mb-5 text-gray-500">
                                            <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                                                <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clip-rule="evenodd"></path><path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path></svg>
                                                Article
                                            </span>
                                            <span className="text-sm">{new Date(e.createdAt).toDateString()}</span>
                                        </div>
                                        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><Link to={`blog/${e._id}`}>{e.heading}</Link></h2>
                                        <p className="mb-5 font-light text-gray-500 dark:text-gray-400">{e.subheading}</p>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center space-x-4">
                                                {/* <img className="w-7 h-7 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png" alt="Bonnie Green avatar" /> */}
                                                <span className="font-medium dark:text-white">
                                                    Author : {e.author}
                                                </span>
                                            </div>
                                            <Link to={`blog/${e._id}`} className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                                                Read more
                                                <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                            </Link>
                                        </div>
                                    </article>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home