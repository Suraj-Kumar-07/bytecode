import React, { useState } from 'react'
import { auth, provider } from "../firebase";
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
function Resetpassword(props) {
    let navigate = useNavigate()
    const [credential, setCredential] = useState({ email: "", password: "" })
    const [forgot, setForgot] = useState(false)
    const forgotpassword = () => {
        sendPasswordResetEmail(auth, credential.email)
            .then(() => {
                setForgot(false);
                setCredential({ ...credential, ['email']: "" });
                props.notify('Reset Link has been sent')
            })
            .catch((error) => {
                // console.log(typeof(error))
                props.notify('Fire Base Error')
            });
    }
    const handleSign = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    }
    return (
        <div className='flex items-center justify-center h-[90vh] w-full mt-[9.8vh]'>
            <section className="">
                <h2 className="font-semibold text-2xl text-[#3F3D56] ">Forgot Password</h2>
                <div className="flex flex-col gap-4 ">
                    <input value={credential.email} onChange={handleSign} className="p-2 mt-8  rounded-xl border" type="email" name="email" placeholder="Email" ></input>
                    <button disabled={ (credential.email === "") ? true : false} onClick={forgotpassword} className={`${(credential.email === "") ? "bg-[#3F3D56]" : "bg-[#3F3D56]"}  rounded-xl text-white py-2 hover:scale-105 duration-300`} >Send reset link</button>
                </div>
                <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
                </div>
            </section>
        </div>
    )
}

export default Resetpassword