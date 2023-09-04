import axios from "axios";
import React, { useEffect, useState } from "react";
import { languageOptions } from "../constants/languageOptions";
import { classnames } from "../utils/general";
import CodeEditorWindow from "./CodeEditorWindow";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useKeyPress from "../hooks/useKeyPress";
import { defineTheme } from "../lib/defineTheme";
import CustomInput from "./CustomInput";
import LanguagesDropdown from "./LanguagesDropdown";
import OutputWindow from "./OutputWindow";
import ThemeDropdown from "./ThemeDropdown";
import Split from 'react-split'
import Discuss from "./Discuss";
import Submission from "./Submission";
import { useLocation } from 'react-router-dom';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function CodeEditor(props) {
let navigate=useNavigate()
    const [problem, setProblem] = useState({
        title: "",
        content: "",
        relatedtopics: "",
        difficulty: "",
       testcaseinput:"",
       testcaseoutput:""
    })

    let location = useLocation();
    const id = location.pathname.split('/')[3];

    let getProblem = async () => {
        try {
            const response = await axios.get(`${props.HOST}/problem/${id}`)
            setProblem(response.data)
            console.log(problem);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProblem();
    }, [])


    
    const [change, setChange] = useState('description')
    const [toggle, setToggle] = useState(false);

    const handleOnConsole = () => {
        setToggle(!toggle);
    }

    const [suboutput, setsuboutput] = useState([])
    const [consol, setConsol] = useState(false)
    const [code, setCode] = useState("");
    const [customInput, setCustomInput] = useState("");
    const [outputDetails, setOutputDetails] = useState(null);
    const [processing, setProcessing] = useState(null);
    
    const [processing1, setProcessing1] = useState(null);
    const [theme, setTheme] = useState("blackboard");
    const [language, setLanguage] = useState(languageOptions[0]);
    const [wrongtc, setWrongtc] = useState(-1)
    const enterPress = useKeyPress("Enter");
    const [isSubmitClick, setIsSubmitClick] = useState(false)
    const [statuscode, setStatuscode] = useState(false)
    const ctrlPress = useKeyPress("Control");
    const [wrs, setWrs] = useState(false)

    const onSelectChange = (sl) => {
        console.log("selected Option...", sl);
        setLanguage(sl);
    };

    useEffect(() => {
        if (enterPress && ctrlPress) {
            console.log("enterPress", enterPress);
            console.log("ctrlPress", ctrlPress);
            handleRun();
        }
    }, [ctrlPress, enterPress]);

    const onChange = (action, data) => {
        switch (action) {
            case "code": {
                setCode(data);
                break;
            }
            default: {
                console.warn("case not handled!", action, data);
            }
        }
    };

    const urlL = "https://judge0-ce.p.rapidapi.com/submissions";
    const jhost = process.env.REACT_APP_JUDGEHOST_APIKEY ;
    const jkey = process.env.REACT_APP_JUDGEKEY_APIKEY ;

    const handleSubmitCode = async (e) => {
        console.log(e)
        setProcessing1(true);
        const formData = {
            language_id: language.id,
            // encode source code in base64
            source_code: btoa(code),
            stdin: btoa(problem.testcaseinput),
            expected_output:btoa(problem.testcaseoutput)
        };
        const options = {
            method: "POST",
            url: urlL,
            params: { base64_encoded: "true", fields: "*" },
            headers: {
                "content-type": "application/json",
                "Content-Type": "application/json",
                "X-RapidAPI-Host": jhost,
                "X-RapidAPI-Key": jkey,
            },
            data: formData,
        };



        try {
            const response = await axios.request(options);
            console.log("res.data", response.data);
            const token = response.data.token;
            const res = await checkStatus(token);
            return res;
        } catch (err) {
            let error = err.response ? err.response.data : err;
            // get error status
            let status = err.response.status;
            console.log("status", status);
            if (status === 429) {
                console.log("too many requests", status);
                props.notify("too many requests")
                setStatuscode(true)
            }
            setProcessing1(false);
            console.log("catch block...", error);
            props.notify(error)
        }
        return -1;
    }

    const handleRun = () => {
        setToggle(true);
        setProcessing(true);
        setIsSubmitClick(false)
        const formData = {
            language_id: language.id,
            // encode source code in base64
            source_code: btoa(code),
            stdin: btoa(customInput),
            // expected_output:btoa(problem.testcaseoutput)

        };
        const options = {
            method: "POST",
            url: urlL,
            params: { base64_encoded: "true", fields: "*" },
            headers: {
                "content-type": "application/json",
                "Content-Type": "application/json",
                "X-RapidAPI-Host": jhost,
                "X-RapidAPI-Key": jkey,
            },
            data: formData,
        };

        axios
            .request(options)
            .then(function (response) {
                console.log("res.data", response.data);
                const token = response.data.token;
                checkStatusc(token);
            })
            .catch((err) => {
                let error = err.response ? err.response.data : err;
                // get error status
                let status = err.response.status;
                console.log("status", status);
                if (status === 429) {
                    console.log("too many requests", status);
                    setStatuscode(true)
                    props.notify('too many requests')
                }
                setProcessing(false);
                console.log("catch block...", error);
                props.notify(error)
            });

        console.log(problem)
    };

    const checkStatusc = async (token) => {
        const options = {
            method: "GET",
            url: urlL + "/" + token,
            params: { base64_encoded: "true", fields: "*" },
            headers: {
                "X-RapidAPI-Host": jhost,
                "X-RapidAPI-Key": jkey,
            },
        };
        try {
            let response = await axios.request(options);
            let statusId = response.data.status?.id;

            // Processed - we have a result
            if (statusId === 1 || statusId === 2) {
                // still processing
                setTimeout(() => {
                    checkStatusc(token);
                }, 2000);
                return;
            } else {
                setProcessing(false);
                setOutputDetails(response.data);
                // let arr=suboutput;
                // arr.push(response.data);
                // setsuboutput(arr);
           
                console.log("response.data", response.data);
                return;
            }
        } catch (err) {
            console.log("err", err);
            setProcessing(false);
            props.notify(err)
            // showErrorToast();
        }
    };
    const checkStatus = async (token) => {
        const options = {
            method: "GET",
            url: urlL + "/" + token,
            params: { base64_encoded: "true", fields: "*" },
            headers: {
                "X-RapidAPI-Host": jhost,
                "X-RapidAPI-Key": jkey,
            },
        };
        try {
            let response = await axios.request(options);
            let statusId = response.data.status?.id;

            // Processed - we have a result
            if (statusId === 1 || statusId === 2) {
                // still processing
                setTimeout(() => {
                    checkStatus(token);
                }, 2000);
                return;
            } else {
                setProcessing1(false);
                // setOutputDetails(response.data);
                // let arr=suboutput;
                // arr.push(response.data);
                // setsuboutput(arr);
            
                console.log("response.data", response.data);
                let correct = false;
                if ( response.data.status.description === 'Accepted' ){
                    correct = true;
                }
                const data = {
                    verdict:response.data.status.description,
                    time : response.data.time,
                    memory: response.data.memory,
                    question:id,
                    language:response.data.language.name,
                    iscorrect:correct 
                }

                const res = await axios.post(`${props.HOST}/submission/createsubmission`, data, {
                    headers :  {
                        'auth-token' : Cookies.get('authtoken')
                    }
                })
                if(response.data.stdout){
            console.log(statusId)
             if(correct){
                    props.notify("Accepted")
                    setChange('submission')
                }
                else{
                    props.notify("Wrong Answer")
                }
               
            console.log(response.data)
            // setLoading(false);
         }
            else{
            // console.log(response.data.stdout,"hjgvyj")
            console.log(statusId)
            if(response.data.stderr)
            // setStdo(atob(response.data.stderr))
        {
            props.notify(response.data.status.description)
        }
           else
           props.notify(response.data.status.description)
            // setLoading(false);
            }


               
            }
        } catch (err) {
            console.log("err", err);
            setProcessing1(false);
            props.notify(err)
            // showErrorToast();
        }
    };

    function handleThemeChange(th) {
        const theme = th;
        console.log("theme...", theme);

        if (["light", "vs-dark"].includes(theme.value)) {
            setTheme(theme);
        } else {
            defineTheme(theme.value).then((_) => setTheme(theme));
        }
    }
    useEffect(() => {
        defineTheme("oceanic-next").then((_) =>
            setTheme({ value: "oceanic-next", label: "Oceanic Next" })
        );
    }, []);

    // const showSuccessToast = (msg) => {
    //     toast.success(msg || `Compiled Successfully!`, {
    //         position: "top-right",
    //         autoClose: 1000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //     });
    // };
    // const showErrorToast = (msg, timer) => {
    //     toast.error(msg || `Something went wrong! Please try again.`, {
    //         position: "top-right",
    //         autoClose: timer ? timer : 1000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //     });
    // };

    return (
        <>
            <div className="mt-[9.8vh] container   dark:bg-slate-900">

                <Split className="split " minSize={400}>
                    <div className="w-1/2 h-[90vh]  relative overflow-y-scroll">
                        <div className="m-2 flex gap-2">
                            <button className="border dark:bg-slate-950 hover:bg-gray-400 text-gray-800 dark:text-white font-bold py-2 px-4 rounded inline-flex items-center" onClick={() => { setChange('description') }}> Decription</button>
                            <button className="border dark:bg-slate-950 hover:bg-gray-400 text-gray-800 dark:text-white font-bold py-2 px-4 rounded inline-flex items-center" onClick={() => { setChange('discuss') }}> Discuss</button>
                            <button className="border dark:bg-slate-950 hover:bg-gray-400 text-gray-800 dark:text-white font-bold py-2 px-4 rounded "
                                onClick={() => { setChange('submission') }}> Submission </button>
                        </div>
                        {
                            change === 'description' ?
                                <div >
                                    <div className="m-5">
                                        <h1 className="mb-2 text-2xl font-semibold   text-gray-900 dark:text-white ">{problem.title}</h1>
                                        <div className="flex gap-10 ">
                                            <span className="text-emerald-600 font-bold" >{problem.difficulty}</span>
                                            <span className="text-emerald-600 font-bold">Solved</span>
                                        </div>
                                        <div id='content' className="mt-4 dark:text-white">
                                            <div dangerouslySetInnerHTML={{ __html: problem.content }} />
                                        </div>
                                        <div className="mt-4 dark:text-white">
                                            <h1 className="font-bold">Related topics:</h1>
                                            <div>
                                                {problem.relatedtopics}
                                            </div>
                                        </div>
                                    </div>
                                    <div>

                                        <div className="flex w-[45%] gap-3 fixed bottom-2 z-20 right-8 justify-end p-4 rounded-md">


                                            <div>
                                                <button className="border dark:bg-slate-950 text-sm hover:bg-gray-400 text-gray-800 dark:text-white font-bold rounded   px-4 py-2 " onClick={handleOnConsole}>
                                                    Console
                                                </button>
                                            </div>
                                            <div>
                                                <button
                                                    onClick={handleRun}
                                                    disabled={!code || processing}
                                                    className={classnames(
                                                        "border dark:bg-slate-950 text-sm  hover:bg-gray-400 text-gray-800 dark:text-white font-bold rounded   px-4 py-2 ",
                                                        !code ? "opacity-100" : ""
                                                    )}
                                                >
                                                    {processing ? "Processing..." : "Run"}
                                                </button>
                                            </div>
                                            <div>
                                                <button onClick={handleSubmitCode}  disabled={!code || processing1}     className={classnames(
                                                        "border dark:bg-slate-950 text-sm  hover:bg-gray-400 text-gray-800 dark:text-white font-bold rounded   px-4 py-2 ",
                                                        !code ? "opacity-100" : ""
                                                    )}
                                                >
                                                    {processing1 ? "Processing..." : "Submit"}
                                                 
                                                </button>
                                            </div>

                                        </div>

                                        {toggle &&
                                            <div id='boxa' className=" fixed z-10 right-0 bottom-0 h-[50vh]  w-[50%] m-auto ">
                                                <div className="w-[95%] h-full  mx-auto rounded-md grid grid-cols-2">
                                                    <div >
                                                       
                                                        <div className="w-full h-full">
                                                            <CustomInput
                                                                customInput={customInput}
                                                                setCustomInput={setCustomInput}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div >
                                                        <div className="w-full   h-full">
                                                            <OutputWindow outputDetails={outputDetails} isSubmitClick={isSubmitClick} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                                : change === 'discuss' ? <Discuss HOST={props.HOST} />
                                    : <Submission HOST={props.HOST}/>

                        }


                    </div>
                    <div className="w-1/2 h-full">
                        <div className="flex flex-row">
                            <div className="px-4 py-2 ">
                                <LanguagesDropdown onSelectChange={onSelectChange} />
                            </div>
                            <div className="px-4 py-2">
                                <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
                            </div>
                        </div>
                        <div className="flex flex-col w-full h-full justify-start items-end">
                            <CodeEditorWindow
                                code={code}
                                onChange={onChange}
                                language={language?.value}
                                theme={theme?.value}
                            />
                        </div>
                    </div>
                </Split>
            </div>
        </>
    )
}

export default CodeEditor