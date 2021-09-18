import React from "react";
import { useDropzone } from "react-dropzone";
import "./Dropzone.css"
/** 
 * Based on a tutorial from: https://blog.logrocket.com/react-drag-and-drop/
 */

const getClassName = (className, isActive) => {
    if (!isActive) return className;
    return `${className} ${className}-active`;
};


/** 
 * Component responsible for making a simple content
 * area into a dropzone area where files can be dropped.
 * 
 * react-dropzone hides the file input and shows the custom
 * dropzone area.
 * 
 * When files are dropped, react-dropzone uses HTML onDrag 
 * events and captures the files from the event area based on
 * whether the files are dropped inside the dropzone area.
 * 
 * If we click on the area, react-dropzone library initiates the 
 * file selections dialog using React ref and allows us to select
 * files and upload them.
 */



const Dropzone = ({ onDrop, accept }) => {
    // Initializing useDropzone hooks with options

    // useDropzone hooks exposes two functions called getRootProps and getInputProps
    // and also exposes isDragActive boolean

    // getRootProps is set based on the parent element of the dropzone area. This 
    // element determines the width and height of the dropzone area.

    // getInputProps is the props passed to the input element. It enables
    // us to support click events along with drag events to get files
    // All the options related to files we pass to the useDropzone are set
    // to this input element. For example, if you want to support only single 
    // files, you can pass multiple: false. It will automatically require the 
    // dropzone to allow only one file to get accepted. 

    // isDragActive is set if the files are dragged above the dropzone area. This
    // will be very useful to mkae the styling based on this variable.


    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept
    });

    return (
        <div className={getClassName("dropzone", isDragActive)} {...getRootProps()}>
            <input className="dropzone-input" {...getInputProps()} />
            <div className="text-center">
                {isDragActive ? (
                    <p className="dropzone-content">Release to drop the files here</p>
                ) : (
                    <p className="dropzone-content">
                        Drag and drop some files here, or click to select files
                    </p>
                )}
            </div>
        </div>
    );
};

export default Dropzone;