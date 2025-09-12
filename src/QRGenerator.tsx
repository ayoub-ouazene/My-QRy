import { QRCodeSVG } from "qrcode.react"
import { useRef,useState} from "react" 

import {motion} from 'framer-motion'

import './QRGenerator.css'


type QRImageSettings = {
  src: string;
  x?: number;
  y?: number;
  height: number;
  width: number;
  excavate: boolean;
};





const QRGenerator = ()=>{


    const TextToEncode = useRef<HTMLInputElement>(null);
  const qrRef = useRef<HTMLDivElement>(null);

  const [qrvalue ,setQRvalue ] = useState("enter your link");
  const [fgcolor , Setfgcolor] = useState("#000000");
  const [fileName, setFileName] = useState('Choose image...');


  const [open , setOpen]  = useState(false);
  const [generate , setGenerate ] = useState(false);
 


    const [aimageSettings, setImageSettings] = useState<QRImageSettings>({
    src: "",      
    height: 40,   
    width: 40,
    excavate: true,
  });



  const handleSubmit = ()=>{

    if(TextToEncode.current)
    {
       setQRvalue(TextToEncode.current.value);
        TextToEncode.current.value = "";
    }
    else
    {
      alert("enter your link");
    }

    setGenerate(true);

   
  }

  const handleDownload =()=>{

    const svgElement = qrRef.current?.querySelector("svg");
    if (!svgElement) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);

    const svgBlob =  new Blob([svgString],{type:"image/svg+xml;charset=utf-8"});
    const url = URL.createObjectURL(svgBlob);

    const a = document.createElement("a");

    a.href = url ;
    a.download = "qrcode.svg";
    a.click();
     

    URL.revokeObjectURL(url);

  

  }


  const handleAddingImg = (event: React.ChangeEvent<HTMLInputElement>)=>{

  const file = event.target.files?.[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file); 
    setImageSettings((prev) => ({
      ...prev,
      src: imageUrl,
    }));
  }

   if (event.target.files && event.target.files[0]) {

    setFileName(event.target.files[0].name);
  }
  }


  const handleChangingColor = (event: React.ChangeEvent<HTMLInputElement> )=>{

      Setfgcolor(event.target.value);
  }

   const handleSummaryOpen = ()=>{
    setOpen(open => !open);
   }






    return (
 <div className="qrcode-generator-container" id = "qrcode-generator-Section">
    
      <div className="header">

        <div className="logo2"></div>
        <div className="text2">
           <h2>QR Code Generator</h2>
          <p>Transform any URL into a professional QR code instantly</p>
        </div>
       

      </div>
      
      <div className="options">

        <div className="input-Container">
             <label><div className="url-logo"></div>Enter your URL</label>
            <input ref={TextToEncode} placeholder="http://example.com" id="input"/>
            <button  type="submit" onClick={handleSubmit}>Generate QR Code</button>
        </div>

        <details className="details">

            <summary className="summary" onClick={handleSummaryOpen} >
              
                <div className="summary-sub-container">
                   <span className="icon1">⚙️</span>more properties for the QR CODE 
                </div>
                {/* <span className="icon2"></span> */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                   <polyline points={open ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
                </svg>

            </summary>
            


            <div className="properties">
    
               <div className="property1">

                  <label id="label">

                     <div style={{display:"flex" , alignItems:"center" , gap:"0.4rem"}}> <div style={{backgroundColor : fgcolor , width:"1rem",height:"1rem" , borderRadius:"50%" ,border:"2px solid  #797373"}} ></div><p>QR Code Color</p>  </div>  
                     <div style={{display:"flex" , alignItems:"center" , gap:"1rem"}}> <input type="color" defaultValue="black" onChange={handleChangingColor}/>  <input type="text" placeholder="#ffff" value={fgcolor} onChange={handleChangingColor}/> </div>
                  </label>

               </div>
                
              <div className="property2">
                
                <label id="label">

                  <p> Image for the QR Code </p>

                    <div>
                      <input placeholder="Choose image..." id="imgInput" type="file" accept="image/*" onChange={handleAddingImg}  />
                    </div> 
                    <label htmlFor="imgInput" className="custom-file-upload">

                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>

                    <span>{fileName}</span>
                  </label>
                
                </label>


              </div>  

            </div>

        </details>
        

      </div>


     {generate ? <div className="QR-Result">

            <div   ref={qrRef} className="qrcode-Container">
              <QRCodeSVG  className="qrcode" value={qrvalue} fgColor={fgcolor} imageSettings={aimageSettings}/>
            </div>

            <motion.button whileHover={{scale:1.05}} onClick={handleDownload}>
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M12 3a1 1 0 0 1 1 1v9.59l2.3-2.3a1 1 0 1 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.42l2.3 2.3V4a1 1 0 0 1 1-1z"/>
                  <path d="M5 20a1 1 0 0 1 0-2h14a1 1 0 1 1 0 2H5z"/>
                </svg>
                Donwload the QR Code
            </motion.button>

      </div> : <></>}

      
      
    </div>
   
    )
}

export default  QRGenerator