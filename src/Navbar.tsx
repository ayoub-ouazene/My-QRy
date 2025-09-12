import { useState } from 'react'
import './Navbar.css'


const Navbar = () => {

    const [selected , SetSelected ] = useState(1);
    const [scroll , setScrooll ] = useState(false);

    const handleScroll = ()=>{
        if(window.scrollY > 80)
        {
            setScrooll(true);
        }
        else
        {
           setScrooll(false);
        }
    }


    window.addEventListener('scroll',handleScroll);


 

    const handleSection1Clicked = ()=>{
        SetSelected(1);
    }
      const handleSection2Clicked = ()=>{
        SetSelected(2);
    }
      const handleSection3Clicked = ()=>{
        SetSelected(3);
    }


    return(
        <div className={scroll?"navbar-scroll":"navbar"}>
            <div className="logoInfo">
                <div className="logo"></div>
                <div className="text">
                    <h2>M<span style={{color:"#28a745"}}>y </span>QR<span style={{color:"#28a745"}}>y</span></h2>
                    <p>Profissional QR Solutions</p>
                </div>
            </div>

            <div className="sections">
                <ul className='sections-list'>
                    <li><a onClick={handleSection1Clicked} href='#qrcode-generator-Section' className={selected==1 ? "selected-section-style" : "section-style"}>QR Generator</a></li>
                    <li><a onClick={handleSection2Clicked}  href='#qrScanner-Section' className={selected==2 ? "selected-section-style" : "section-style"}>QR Scanner</a></li>
                    <li><a  onClick={handleSection3Clicked}  href='#Features-Section' className={selected==3 ? "selected-section-style" : "section-style"}>Features</a></li>    
                </ul>

            </div>

        </div>

    )

}

export default Navbar