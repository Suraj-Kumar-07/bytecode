import React,  { useState , useEffect } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom'
import axios from 'axios';


function Problems(props) {

    const [solvedProblem, setSolvedProblem] = useState([]);
    

    const [question, setQuestion] = useState([]);
    let getQuestions = async () => {
        try {
            const response = await axios.get(`${props.HOST}/problem/allquestion`)
            console.log(response.data)
            console.log('getQuestion')
            setQuestion(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    let getSolvedQuestion = async ()=>{
        
        try {
          
                const response=await axios.post(`${props.HOST}/submission/api/getcorrect`,{},{
                    headers:{
                        'auth-token':Cookies.get('authtoken')
                    }
                })
            const data = response.data;
            console.log(data);
            setSolvedProblem(data);
        } catch (error) {   
            console.log('getSolved');
            console.log(error)
        }
    }
    useEffect(() => {
        getSolvedQuestion();
        getQuestions();
    }, [])

    return (
        <div className='mt-[9.8vh]'>
            <div className="px-[10vw] min-h-[90vh] py-[3vw] dark:bg-gray-900">
                <h1 className="mb-[4vh] text-3xl font-bold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
                    We invest time in <span className='text-red-600 text-6xl font-extrabold'>Problems </span>
                </h1>
                <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3 rounded-l-lg">
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Link
                                </th>
                                <th scope="col" className="px-6 py-3 rounded-r-lg">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {question.map((problem, index) => 
                            (
                                <tr key={index} className="bg-white border-y border-y-gray-700 dark:bg-gray-800">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {problem.title}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link to={`editor/${problem._id}`} >
                                            Go to Link
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                            {
                                               solvedProblem.filter(e=>e.question===problem._id).length>0? <div>Solved</div>: <div>Unsolved</div>
                                            }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Problems;
