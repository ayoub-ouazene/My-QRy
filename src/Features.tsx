
import "./Features.css"
import Feature from "./components/Feature.tsx"

function Features(){
  return (
    <div className="Features-Section">
      <div className="header4">

        <h2>Why Choose MyQRy CODE?</h2>
        <p>Professional QR code solutions with enterprise-grade reliability and modern design</p>

      </div>


    <div className="Features">
      <Feature pic={1} title="High Quality" description="Generate crisp, scalable QR codes perfect for any use case" />
      <Feature   pic={2} title="Fast Scanning" description="Lightning-fast QR code recognition with advanced algorithms"/>
      <Feature  pic={3} title="Easy Export" description="Download in multiple formats for web, print, or mobile use"/>

    </div>

    </div>
  )
}


export default Features