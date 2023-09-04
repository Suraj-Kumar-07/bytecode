import React from "react";

const OutputWindow = ({ outputDetails,isSubmitClick }) => {
  const getOutput = () => {
    let statusId = outputDetails?.status?.id;
if(isSubmitClick && statusId===3){
  return <div></div>
}
    if (statusId === 6) {
      // compilation error
      return (
        <pre className="font-normal text-xl  text-slate-950">
          {atob(outputDetails?.compile_output)}
        </pre>
      );
    } else if (statusId === 3) {
      return (
        <pre className="font-normal text-xl text-slate-950">
          {atob(outputDetails.stdout) !== null
            ? `${atob(outputDetails.stdout)}`
            : null}
        </pre>
      );
    } else if (statusId === 5) {
      return (
        <pre className="font-normal text-xl  text-slate-950">
          {`Time Limit Exceeded`}
        </pre>
      );
    } else {
      return (
        <pre className="font-normal text-xl  text-slate-950">
          {atob(outputDetails?.stderr)}
        </pre>
      );
    }
  };
  return (
    <>

      <div className="focus:outline-none w-full h-[40vh] overflow-y-scroll border-2 border-black z-10 rounded-md  px-4 py-2 hover:shadow transition duration-200 bg-white mt-2">
        {outputDetails ? <>{getOutput()}</> : <div className="text-xl  text-gray-400" >Output</div>}
      </div>
    </>
  );
};

export default OutputWindow;
