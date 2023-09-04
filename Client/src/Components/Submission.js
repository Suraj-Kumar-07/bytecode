import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';


function Submission(props) {

    let [submission, setSubmissions] = useState([])
    let location = useLocation();
    const id = location.pathname.split('/')[3];

    let getSub = async ()=>{
        try {
            console.log(`${props.HOST}/submission/${id}`)
            const r = await axios.post(`${props.HOST}/submission/${id}`, {}, {
                headers :  {
                    'auth-token' : Cookies.get('authtoken')
                }
            })
            const data = r.data;
            console.log(data)
            data.sort((a, b)=>{
                if ( a.createdAt < b.createdAt ){
                    return 1;
                }
                return -1;
            })
            setSubmissions(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect( () => {
        getSub();
    }, [])

  return (
    <div>
        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3 rounded-l-lg">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Language
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Runtime
                                </th>
                                <th scope="col" className="px-6 py-3 rounded-r-lg">
                                    Memory
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                                {
                                    submission.map((e) => {
                                            return (
                                            <tr className="bg-white border-y border-y-gray-700 dark:bg-gray-800">
                                            <td className="px-6 py-4 font-semi-bold whitespace-nowrap text-green-600">
                                                {e.verdict}
                                            </td>
                                            <td className="px-6 py-4">
                                                {e.language}
                                            </td>
                                            <td className="px-6 py-4">
                                                {e.time}s
                                            </td>
                                            <td className="px-6 py-4">
                                                {e.memory}KB
                                            </td>
                                        </tr>)
                                        })
                                }
                                
                        </tbody>
                    </table>
                </div>
    </div>
  )
}

export default Submission