// ImageDisplay.js
import React from 'react';

const ImageDisplay = ({ capturedImage, onClose }) => {
  return (
    <div style={{ backgroundColor: '#202124', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'Consolas' }}>
      <button onClick={onClose} style={{ margin: '10px', padding: '10px', backgroundColor: '#61dafb', color: 'black', border: 'none', cursor: 'pointer' }}>Close</button>
      {/* <h3>srrk srrk</h3> */}
      <img src={capturedImage} alt="Captured Image" />

    </div>
  );
};

export default ImageDisplay;
