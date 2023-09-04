import React from "react";
import { classnames } from "../utils/general";

const CustomInput = ({ customInput, setCustomInput }) => {
  return (
    <>
      {" "}
      <textarea
        rows="5"
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder={`Custom input`}
        className={classnames(
          "focus:outline-none w-full h-[40vh] overflow-y-scroll border-2 border-black z-10 rounded-md text-lg  px-4 py-2 hover:shadow transition duration-200 bg-white mt-2"
        )}
      ></textarea>
    </>
  );
};

export default CustomInput;
