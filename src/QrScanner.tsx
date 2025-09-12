// src/components/QrScanner.tsx

import React, { useEffect, useState, useRef } from 'react';
import { 
  Html5QrcodeScanner, 
  Html5Qrcode,
  type Html5QrcodeResult 
} from 'html5-qrcode';

import './QrScanner.css'

type ViewMode = 'choice' | 'camera' | 'result';

const QrScanner = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('choice');
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isProcessingFile, setIsProcessingFile] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- CORRECTED useEffect HOOK ---
  useEffect(() => {
    // Exit if we are not in camera view.
    if (viewMode !== 'camera') return;

    // --- Define Callbacks ---
    const onScanSuccess = (decodedText: string, decodedResult: Html5QrcodeResult) => {
      setScanResult(decodedText);
      setViewMode('result');
      console.log("Scan successful:", decodedResult);
    };

    const onScanError = (errorMessage: string) => {
      // This callback can be used to handle errors, but for now we'll just log them.
      // console.warn(`QR code scan error = ${errorMessage}`);
    };

    // --- Initialize and Start Scanner ---
    const html5QrcodeScanner = new Html5QrcodeScanner(
      "reader", // The ID of the element to render the scanner in
      { 
        fps: 10, 
        qrbox: { width: 250, height: 250 } 
      },
      /* verbose= */ false
    );

    // This is the crucial step: START the scanner.
    html5QrcodeScanner.render(onScanSuccess, onScanError);

    // --- Cleanup Function ---
    // This is called when the component unmounts or the viewMode changes.
    return () => {
      // It's important to clear the scanner to release the camera.
      html5QrcodeScanner.clear().catch(error => {
        console.error("Failed to clear scanner on cleanup.", error);
      });
    };
  }, [viewMode]); // This effect re-runs whenever viewMode changes.

  const handleFileScan = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessingFile(true);
    // Use a temporary element for file scanning if 'reader' is used by the camera.
    // However, since views are separate, reusing 'reader' is okay but can be clearer.
    const html5QrCode = new Html5Qrcode("reader");

    html5QrCode.scanFile(file, true)
      .then(decodedText => {
        setScanResult(decodedText);
        setViewMode('result');
      })
      .catch(err => {
        console.log(err);
        alert(`Failed to scan QR code from file. Please ensure the image is clear.`);
      })
      .finally(() => {
        setIsProcessingFile(false);
      });
  };

  const resetScanner = () => {
    setScanResult(null);
    setViewMode('choice');
  };

  const renderChoiceView = () => (
    isProcessingFile ? (
      <p className="feedbackText">Processing image...</p>
    ) : (
      <div className="choiceContainer">
        <button onClick={() => setViewMode('camera')} className="primaryButton1">
               <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 20 25">
                  <path d="M9.4 4.2 8.2 6H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3.2l-1.2-1.8a1 1 0 0 0-.8-.4h-4a1 1 0 0 0-.8.4zM12 17a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
                </svg>
          
               Scan using Camera

        </button>
        
        <div className="separator"> 
          <span className="orText">OR</span>
        </div>
        
        <button onClick={() => fileInputRef.current?.click()} className="primaryButton2">
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
          Scan from File
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileScan}
          accept="image/*"
          style={{ display: 'none' }}
          placeholder='enter'
        />
      </div>
    )
  );

  const renderCameraView = () => (
    <>
    <div className='BeforeStartContainer'>
       <div id="reader" className="cameraReader"></div>
       <button onClick={() => setViewMode('choice')} className="secondaryButton">
        Cancel
       </button>

    </div>
     
    </>
  );

  const renderResultView = () => (
    <div className="resultContainer">
      <p className="resultText">Scan Successful!</p>
      <a 
        href={scanResult!} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="resultLink"
      >
        {scanResult}
      </a>
      <button onClick={resetScanner} className="secondaryButton">
        Scan Again
      </button>
    </div>
  );

  return (
    <div className="container" id="qrScanner-Section">

      <div className="header3">

        <div className="logo3"></div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
          <h1 className="title">QR Code Scanner</h1>
          <p>Scan QR codes using your camera or upload an image</p>
        </div>

      </div>
      
      {viewMode === 'choice' && renderChoiceView()}
      {viewMode === 'camera' && renderCameraView()}
      {viewMode === 'result' && renderResultView()}


      <div className="note">

        <h5>Supported formats</h5>
        <p>JPG, PNG, GIF, WebP • Max size: 10MB</p>

      </div>
  </div>

  
  );
};

export default QrScanner;