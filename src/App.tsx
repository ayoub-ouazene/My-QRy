
import QrScanner from "./QrScanner.tsx";
import QRGenerator from "./QRGenerator.tsx";
import Navbar from "./Navbar.tsx";

import Features from "./Features.tsx";
import FooterSection from "./FooterSection.tsx";






function App() {

  


  return(

 <div >
   <Navbar/>
    <div style={{display:"flex", flexDirection:"column", alignItems:"center",justifyContent:"space-between",gap:"7rem"}}> 

    <QRGenerator id="qrcode-generator-Section"/>
     
     <QrScanner id="qrScanner-Section"/>

     <Features id="Features-Section"/>

    </div>

    <FooterSection/>

 </div>
  

    
    
  )
 
 
}

export default App
