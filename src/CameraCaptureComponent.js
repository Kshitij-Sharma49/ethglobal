// CameraCaptureComponent.js
import React, { useRef, useState } from 'react';
import ImageDisplay from './ImageDisplay';

const CameraCaptureComponent = () => {
  const videoRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showImageDisplay, setShowImageDisplay] = useState(false);
  const [imageHash, setImageHash] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;

      console.log('Camera opened successfully.');
    } catch (error) {
      console.error('Error accessing the camera:', error);
    }
  };

  const captureImage = async () => {
    const video = videoRef.current;

    // Check if the video ref is not null
    if (!video) {
      console.error('Video element is not available.');
      return;
    }

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Draw the current frame from the video onto the canvas
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas content to a data URL
    const imageDataURL = canvas.toDataURL('image/png');

    // Set the captured image state
    setCapturedImage(imageDataURL);

    console.log('Image captured successfully:', imageDataURL);

    // Hash the captured image
    const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(imageDataURL));
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    // Set the image hash state
    setImageHash(hashHex);

    console.log('Image hash generated successfully:', hashHex);

    // Show the image display window
    setShowImageDisplay(true);
  };

  const closeImageDisplay = () => {
    // Hide the image display window
    setShowImageDisplay(false);
  };

  return (
    <div style={{ backgroundColor: '#202124', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'Consolas' }}>
    <h1>Face Signature</h1>
    {!showImageDisplay && !capturedImage && <button onClick={startCamera} style={{ margin: '10px', padding: '10px', backgroundColor: '#61dafb', color: 'black', border: 'none', cursor: 'pointer' }}>Start Camera</button>}
    {!showImageDisplay && !capturedImage && <button onClick={captureImage} style={{ margin: '10px', padding: '10px', backgroundColor: '#61dafb', color: 'black', border: 'none', cursor: 'pointer' }}>Capture</button>}
    {!showImageDisplay && !capturedImage && <video ref={videoRef} width="640" height="480" autoPlay style={{ margin: '10px' }}></video>}
    {showImageDisplay && <ImageDisplay capturedImage={capturedImage} onClose={closeImageDisplay} />}
    {imageHash && <p style={{ marginTop: '10px' }}>Image Hash: {imageHash}</p>}
  </div>
  );
};

export default CameraCaptureComponent;
