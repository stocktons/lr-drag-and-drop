import React, { useRef } from "react";
// import useDrag and useDrop hooks from react-dnd
import { useDrag, useDrop } from "react-dnd";
import "./ImageList.css";

const type = "Image"; // Need to pass which type element can be 
// draggable - a simple string or Symbol. This is like an Unique ID 
// so that the library knows what type of element is dragged or dropped on.

// Rendering individual images
const Image = ({ image, index, moveImage }) => {
  const ref = useRef(null); // Initialize the reference

  // useDrop hook is responsible for handling whether any item gets hovered 
  // or dropped on the element
  const [, drop] = useDrop({
    accept: type,
    // this method is called when we hover over an element while dragging
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      // current element where the dragged element is hovered on
      const hoverIndex = index;
      // if the dragged element is hovered in the same place, then do nothing
      if (dragIndex === hoverIndex) {
        return;
      }
      // if it is dragged around other elements, then move the image and 
      // set the state with position changes
      moveImage(dragIndex, hoverIndex);

      // Update the index for dragged item directly to avoid flickering
      // when the image was half dragged into the next

      item.index = hoverIndex;
    }
  });

  // useDrag will be responsible for making an element draggable. It also
  // exposes the isDragging method to add any styles while dragging.
  const [{ isDragging }, drag] = useDrag({
    // item denotes the element type, unique identifier (id) and the index (position)
    // old version of this code from the tutorial:
    // item: { type, id: image.id, index },
    // updated version below, from here: https://github.com/react-dnd/react-dnd/releases/tag/v14.0.0
    type: type,
    item: { id: image.id, index },
    // collect method is like an event listener, it monitors whether the element is
    // dragged and exposes that information
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  // Initialize drag and drop into the element using its reference.
  // Here we initialize both drag and drop on the same element (i.e., Image component)
  drag(drop(ref));

  // Add teh reference to the element
  return (
    <div 
      className="file-item"
      ref={ref}
      style={{ opacity: isDragging ? 0 : 1 }}
    >
      <img alt={`img - ${image.id}`} src={image.src} className="file-img" />
    </div>
  );
};

// ImageList Component
const ImageList = ({ images, moveImage }) => {

  // render each image by calling Image component
  const renderImage = (image, index) => {
    return (
      <Image
        image={image}
        index={index}
        key={`${image.id}-image`}
        moveImage={moveImage}
      />
    );
  };

  // Return the list of files
  return <section className="file-list">{images.map(renderImage)}</section>;
};

export default ImageList;