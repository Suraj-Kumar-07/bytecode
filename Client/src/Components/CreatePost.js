import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from "react";
import { Navigate, useAsyncError, useNavigate } from "react-router-dom";
import axios from "axios";
import Filebase from 'react-file-base64'
import Cookies from "js-cookie";


function CreatePost(props) {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [author, setAuthor] = useState({});
    let navigate = useNavigate();

    let getUser = async ()=>{
        try {
            const user = await axios.post(`${props.HOST}/auth/getuser`, {}, {
                headers :  {
                    'auth-token' : Cookies.get('authtoken')
                }
            })
            const data = user.data;
            console.log(data);
            setAuthor(data.name)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect( () => {
        getUser();
    }, [])
    


    async function handleOnSubmit(ev) {
        ev.preventDefault();

        if ( title.length == 0 ){
            alert('title cannot be empty')
            return
        }
        if ( summary.length == 0 ){
            alert('summary cannot be empty')
            return
        }
        const data = {
            heading : title, 
            subheading : summary, 
            // photo : files[0],
            content : content,
            author : author
        }
        console.log(data);
        const response = await axios.post(`${props.HOST}/blog/createblog`,data,{
            headers:{
                'auth-token' : Cookies.get('authtoken')
            }
        });

        console.log(response);
        if ( response ) navigate('/')
    }

    return (
        <>
            <div className="m-[12vh] px-10 border border-gray-300 rounded-lg">
                <form onSubmit={handleOnSubmit} >
                    <div className="p-6">
                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type='title'
                            placeholder={'Title'}
                            value={title}
                            onChange={ev => setTitle(ev.target.value)} />
                    </div>
                    <div className="p-6">
                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type='Summary'
                            placeholder={'Summary'}
                            value={summary}
                            onChange={ev => setSummary(ev.target.value)} />
                    </div>
                    <div className="p-6">
                    <input id='file' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  type='file'
                        onChange={ev => setFiles(ev.target.files)} />
                    </div>
                    <div className="p-6">
                        <ReactQuill
                            value={content}
                            theme="snow"
                            onChange={setContent}
                            />
                    </div>
                    <div className="pb-6 px-[20%]">
                    <button type='submit' className="w-full mt-10 py-3 
                    text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 rounded-lg text-center" >Create post</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreatePost