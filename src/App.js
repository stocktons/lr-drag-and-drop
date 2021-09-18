import React, { useCallback, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import { v4 as uuid } from "uuid";

import ImageList from "./ImageList";
import Dropzone from "./Dropzone";
import "./App.css";


function App() {
  // Create a state called images using useState hooks and pass 
  // the initial value as empty array

  /**
  images data looks like: 
  const images = [
    {
      id: 'abcd123',
      src: 'data:image/png;dkjds...',
    },
    {
      id: 'zxy123456',
      src: 'data:image/png;sldklskd...',
    }
  ] 
  */
  const [images, setImages] = useState([]);

  // onDrop function
  // useCallback avoids unnecessary re-renders
  const onDrop = useCallback(acceptedFiles => {
    // this callback will be called after files get dropped, we will 
    // get the acceptedFiles. You can even access the rejected files, too.
    console.log(acceptedFiles);

    acceptedFiles.map(file => {
      // Initialize FileReader browser API
      const reader = new FileReader();
      // onload callback gets called after the reader reads the file data
      reader.onload = function(e) {
        // add image into the state. Since FileReader reading process is async,
        // it's better to get the latest snapshot state (i.e., prevState) and
        // update it.
        setImages(prevState => [
          ...prevState,
          { id: uuid(), src: e.target.result }
        ]);
      };
      // Read the file as Data URL (since we only accept images)
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  const moveImage = (dragIndex, hoverIndex) => {
    // Get the dragged element
    const draggedImage = images[dragIndex];
    /*
    - copy the dragged image before hovered element (i.e. [hoverIndex, 0, draggedImage])
    - remove the previous reference of dragged element (i.e. [dragIndex, 1])
    - here we are using this update helper method form immutability-helper package
    */
   setImages(
     update(images, {
       $splice: [[dragIndex, 1], [hoverIndex, 0, draggedImage]]
     })
   );
  };

  // We pass onDrop function and accept prop to the component. It will
  // be used as initial params for useDropzone hook
  // below, we accept only images, but if you want to accept images and
  // PDFs, for example, use accept={'application/pdf, image/*'}
  return (
    <div className="App">
      <h1 className="text-center">Drag and Drop Example</h1>
      <div className="drag-and-drop-container">
        <Dropzone onDrop={onDrop} accept={"image/*"} />
      </div>
      {images && images.length > 0 && (
        <h3 className="text-center">Drag the images to change order </h3>
      )}
      <DndProvider backend={HTML5Backend}>
        <ImageList images={images} moveImage={moveImage} />
      </DndProvider>
    </div>
  );
}

export default App;
