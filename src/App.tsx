
import QrScanner from "./QrScanner.tsx";
import QRGenerator from "./QRGenerator.tsx";
import Navbar from "./Navbar.tsx";

import Features from "./Features.tsx";
import FooterSection from "./FooterSection.tsx";






function App() {

  


  return(

 <div >
   <Navbar/>
    <div style={{display:"flex", flexDirection:"column", alignItems:"center",justifyContent:"space-between",gap:"5rem"}}> 

    <QRGenerator/>
     
     <QrScanner/>

     <Features/>

    </div>

    <FooterSection/>

 </div>
  

    
    
  )
 
 
}

export default App
