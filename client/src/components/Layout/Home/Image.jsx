import React, { useState, useEffect } from "react";
import "./ImageFadeTransition.css";
import Shirt1 from "../../../images/shirt1.png";
import Shirt2 from "../../../images/shirt2.png";

const ImageFadeTransition = () => {
  const [showFirstImage, setShowFirstImage] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirstImage((prev) => !prev);
    }, 3000); // Byter bild var tredje sekund
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="image-container">
      <img
        src={Shirt1}
        alt="Shirt 1"
        className={`fade-image ${showFirstImage ? "visible" : "hidden"}`}
        style={{
          height: "300px",
          width: "auto",
          objectFit: "contain", // Bevara bildens proportioner utan beskärning
        }}
      />
      <img
        src={Shirt2}
        alt="Shirt 2"
        className={`fade-image ${!showFirstImage ? "visible" : "hidden"}`}
        style={{
          height: "300px",
          width: "auto",
          objectFit: "contain", // Bevara bildens proportioner utan beskärning
        }}
      />
    </div>
  );
};

export default ImageFadeTransition;
