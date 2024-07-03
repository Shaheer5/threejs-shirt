import React from "react";
import CustomButton from "./CustomButton";
import { getContrastingColor } from "../config/helpers";
import { useSnapshot } from "valtio";

const FilePicker = ({ file, setFile, readFile }) => {
  return (
    <div className="filepicker-container">
      <div className="flex flex-1 flex-col">
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label
          htmlFor="file-upload"
          className="filepicker-label to-black"
        >
          Upload file
        </label>
        <p
          className="mt-2 text-gray-500 text-xs truncate to-black"
        >
          {file ? file.name : "No file selected"}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <CustomButton
          type={"outline"}
          title={"Logo"}
          handleClick={() => readFile("logo")}
          customStyles={"text-xs"}
        />
        <CustomButton
          type={"filled"}
          title={"Full"}
          handleClick={() => readFile("full")}
          customStyles={"text-sm py-1"}
        />
      </div>
    </div>
  );
};

export default FilePicker;
