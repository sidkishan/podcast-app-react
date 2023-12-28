import { useState } from "react";
import "./Input.css";
const FileInput = ({ text, accept, id, fileHandler }) => {
  const [selectedFile, setSelectedFile] = useState("");
  const onChange = (e) => {
    setSelectedFile(e.target.files[0]?.name);
    fileHandler(e.target.files[0]);
  };
  return (
    <>
      <label
        htmlFor={id}
        className={`custom-input ${!selectedFile ? "label-input" : "active"}`}
      >
        {selectedFile ? `Selected file- ${selectedFile}` : text}
      </label>
      <input
        type="file"
        accept={accept}
        id={id}
        style={{ display: "none" }}
        onChange={onChange}
      />
    </>
  );
};
export default FileInput;

// onChange={(e) => {
//     setState(e.target.file);
//   }}
