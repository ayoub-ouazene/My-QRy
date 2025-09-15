import React, { useEffect, useState, useRef } from 'react';
import {motion , AnimatePresence,  easeIn} from 'framer-motion'
import { useInView } from "react-intersection-observer";

import { 
  Html5QrcodeScanner, 
  Html5Qrcode,
  type Html5QrcodeResult 
} from 'html5-qrcode';

import './QrScanner.css'

interface QrProps {
  id: string;
}

type ViewMode = 'choice' | 'camera' | 'result';

const QrScanner: React.FC<QrProps>  = ({id}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('choice');
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isProcessingFile, setIsProcessingFile] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [ref, inView] = useInView({ threshold: 0.5});

  // --- useEffect HOOK for Camera ---
  useEffect(() => {
    if (viewMode !== 'camera') return;

    const onScanSuccess = (decodedText: string, decodedResult: Html5QrcodeResult) => {
      setScanResult(decodedText);
      setViewMode('result');
      console.log(decodedResult);
    };

    const onScanError = (errorMessage: string) => {
     console.log(errorMessage);
    };

    const html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      { 
        fps: 10, 
        qrbox: { width: 250, height: 250 } 
      },
      false
    );

    html5QrcodeScanner.render(onScanSuccess, onScanError);

    return () => {
      html5QrcodeScanner.clear().catch(error => {
        console.error("Failed to clear scanner on cleanup.", error);
      });
    };
  }, [viewMode]);

  // --- FINAL ROBUST FILE SCAN HANDLER ---
  const handleFileScan = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setIsProcessingFile(true);

    try {
      // --- LINTER ERROR FIX ---
      // The comment below disables the 'no-explicit-any' rule for the next line.
      // This is the standard way to handle a necessary exception to a linting rule.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const html5QrCode = new Html5Qrcode({ verbose: false } as any);
      
      // The `showImage` parameter must be `true` for the library's
      // internal processing to work correctly, even in headless mode.
      const decodedText = await html5QrCode.scanFile(file, /* showImage= */ true);

      // --- SUCCESS PATH --- 
      setScanResult(decodedText);
      setViewMode('result');

    } catch (err) {
      // --- FAILURE PATH ---
      console.error("Error during file scan:", err);
      alert("Invalid File: No QR code could be found in the selected image. Please try a different file.");
      
    } finally {
      // --- CLEANUP (ALWAYS RUNS) ---
      setIsProcessingFile(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const resetScanner = () => {
    setScanResult(null);
    setViewMode('choice');
  };

  // --- RENDER FUNCTIONS (No changes below this line) ---

  const renderChoiceView = () => (
    isProcessingFile ? (
      <p className="feedbackText">Processing image...</p>
    ) : (
      <div className="choiceContainer">
        <motion.button onClick={() => setViewMode('camera')} className="primaryButton1"
          initial={{scale:1}}
          whileHover={{scale:1.1}}
          transition={{duration:0.2 , delay:0}}

          >
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 20 25">
              <path d="M9.4 4.2 8.2 6H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3.2l-1.2-1.8a1 1 0 0 0-.8-.4h-4a1 1 0 0 0-.8.4zM12 17a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
            </svg>
            Scan using Camera
        </motion.button>
        
        <div className="separator"> 
          <span className="orText">OR</span>
        </div>
        
        <motion.button onClick={() => fileInputRef.current?.click()} className="primaryButton2"
           initial={{scale:1}}
          whileHover={{scale:1.1}}
          transition={{duration:0.2 , delay:0}}
          >
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
          Scan from File
        </motion.button>
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
        <motion.button onClick={() => setViewMode('choice')} className="secondaryButton"
          whileHover={{rotate:1 , scale:0.9}}
          transition={{duration:0.2 , ease:easeIn}}
          >
          Cancel
        </motion.button>
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

  <AnimatePresence> 
    <motion.div className="container" id={id}
     ref={ref} 
    initial={{scale:0 , filter :"blur(10px)"}}
    // whileInView={{scale:1 , filter:"blur(0px)"}}
    animate={
      inView?
      {scale:1 , filter:"blur(0px)"}:
      {scale:0 , filter :"blur(10px)"}
    }
    viewport={{amount:0.1 }}
    transition={{duration:0.5 , delay:0.1 ,ease:"easeOut"}}
    
    >
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
    </motion.div>

  </AnimatePresence>  
  );
};

export default QrScanner;