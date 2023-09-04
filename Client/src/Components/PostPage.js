import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';



function PostPage(props) {
    const [article, setArticle] = useState({
        heading : "",
        subheading: "",
        content : "",
        author: "",
        createdAt : ""
    })
    let location = useLocation();
    const id = location.pathname.split('/')[2];
    // console.log(id)
    let getArticle = async () => {
        try {
            const response = await axios.get(`${props.HOST}/blog/${id}`)
            setArticle(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getArticle();
    }, [])
    return (
        <>
            <section className='container mx-auto md:px-2 pt-16 pb-2 w-2/3'>
                <div className='flex justify-center'>
                    <div className='post pt-10'>
                        <h1 className='font-bold text-4xl text-center pb-5'>
                           {article.heading}
                        </h1>
                        <h1 className='text-gray-500 pb-10 text-2xl text-center'> 
                        {article.subheading}</h1>
                        <p className='text-gray-500 text-xl '>
                        <div dangerouslySetInnerHTML={{ __html: article.content }} />
                        </p>
                        <div className='flex justify-between items-center'>
                        <div className='mt-10 text-gray-500 text-l'>Author:{article.author}</div> 
                        <div className='mt-10 text-gray-500 text-l'>Created At : {new Date(article.createdAt).toLocaleDateString()}

                        </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default PostPage