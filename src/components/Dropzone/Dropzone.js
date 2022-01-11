import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const Dropzone = ({ setFile, file }) => {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    setFile(acceptedFiles[0]);
  });
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
  });
  return (
    <div>
      <div {...getRootProps()} className="zone">
        {file && (
          <img
            src={URL.createObjectURL(file)}
            style={{ height: "150px" }}
            alt=""
          />
        )}
        <input {...getInputProps()} />
        <p className="add-pic">Add a photo</p>
      </div>
    </div>
  );
};

export default Dropzone;
