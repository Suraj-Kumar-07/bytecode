import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import Avatar from 'react-avatar';

function Discuss(props) {
  let [comment, setComment] = useState('')
  let [comments, setComments] = useState([])
  let location = useLocation();
  const id = location.pathname.split('/')[3];

  const getComments = async ()=>{
    try {
      console.log(`${props.HOST}/discussion/${id}`)
      const r = await axios.get(`${props.HOST}/discussion/${id}`)
      const data = r.data;
      console.log(data)
      data.sort((a, b)=>{
          if ( a.createdAt < b.createdAt ){
              return 1;
          }
          return -1;
      })
      setComments(data)
  } catch (error) {
      console.log(error)
  }
  }

  useEffect(()=>{
    getComments()
  },[])

  const handleOnClick = async ()=>{
    try {
      const data = {
        name : Cookies.get('name'),
        content : comment,
        question:id
      }
      const r = await axios.post(`${props.HOST}/discussion/creatediscussion`, data,{headers:{
        'auth-token' : Cookies.get('authtoken')
    }
  });

  setComment('');
  getComments();
  console.log(r);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='w-full dark:bg-gray-900 h-[80vh] overflow-y-scroll '>
      <section class="bg-white dark:bg-gray-900 py-8 lg:py-16">
        <div class="max-w-2xl mx-auto px-4">
          <div class="mb-6">
            <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <textarea id="comment" rows="6" value={comment}
                class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..." required onChange={e=>{setComment(e.target.value)}}></textarea>
            </div>
            <button type="button"
              class="border py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800" onClick={handleOnClick}>
              Post comment
            </button>
          </div>
          {
                            comments.map((e) => {
                                return (
          <article class="p-3 text-base bg-white rounded-lg dark:bg-gray-900">
            <footer class="flex justify-between items-center mb-2">
              <div class="flex items-center">
                <p class="flex gap-2 items-center mr-3 text-sm text-gray-900 dark:text-white">
                  <Avatar name={e.name} size='25px' round />
                  {e.name}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400"><time>{new Date(e.createdAt).toLocaleDateString()}</time></p>
              </div>
            </footer>
            <p class="text-gray-500 dark:text-gray-400">{e.content}</p>
          </article>
                                )
        }
          
          
      )}
        </div>
      </section>
    </div>
  )
}

export default Discuss