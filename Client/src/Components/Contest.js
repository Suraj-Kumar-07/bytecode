import React, { useEffect, useState } from 'react'
import axios from 'axios'


function Contest() {
  const [constestList, setConstestList] = useState([]);
  const url = 'https://codeforces.com/api/contest.list';

  let getResponse = async ()=>{
    try{
      const res = await axios.get(`${url}`)
      // setConstestList(res.data)
      // console.log(res.data);
      let arr=res.data.result.filter(e=>e.phase==='BEFORE')
      // console.log(arr)
      setConstestList(arr)
    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    getResponse();
  },[])

  return (
    <div className='mt-[9.8vh] min-h-[90vh] px-[10vw] py-[3vw] dark:bg-gray-900'>
      <div class="mb-[4vh] text-3xl font-bold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">We invest time in <span className='text-red-600 text-6xl font-extrabold'>Contests </span> </div>
      <div className=" grid grid-cols-2 place-items-center p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">

     {  constestList.map((e)=>{
      return (
<div className='p-10'>
        <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{e.name}</div>
        <div>{new Date(e.startTimeSeconds
).toTimeString()}</div>
        </a>
        </div>
      )
     }) }
      
      
      </div>
    </div>

  )
}

export default Contest