import { useState, useEffect  } from 'react';
import { Link, Events } from 'react-scroll';
import './Navbar.css';




const Navbar = () => {



 

    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('qrcode-generator-Section');


   

    useEffect(() => {
        const sectionIds = [
            'qrcode-generator-Section',
            'qrScanner-Section',
            'Features-Section'
        ];
        const sections = sectionIds.map(id => document.getElementById(id));

        const observerOptions = {
            root: null,
            threshold: 0.4,
        };

        // FIX IS HERE: Added the type for the 'entries' parameter
        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach(section => {
            if (section) {
                observer.observe(section);
            }
        });

        const handleSetActive = (to: string) => {
            setActiveSection(to);
        };
        Events.scrollEvent.register('begin', handleSetActive);

        return () => {
            if (observer) observer.disconnect();
            Events.scrollEvent.remove('begin');
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 80);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <>
        <div  className={isScrolled ? "navbar-scroll" : "navbar"}>
            <div className="logoInfo">
                <div className="logo"></div>
                <div className="text">
                    <h2>M<span style={{ color: "#28a745" }}>y </span>QR<span style={{ color: "#28a745" }}>y</span></h2>
                    <p>Profissional QR Solutions</p>
                </div>
            </div>
            <div className="sections">
                <ul className='sections-list'>
                    <li>
                        <Link
                            to="qrcode-generator-Section"
                            className={activeSection === 'qrcode-generator-Section' ? 'selected-section-style' : ''}
                            smooth={true}
                            duration={1000}
                            offset={-180}
                        >
                            QR Generator
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="qrScanner-Section"
                            className={activeSection === 'qrScanner-Section' ? 'selected-section-style' : ''}
                            smooth={true}
                            duration={1000}
                            offset={-100}
                        >
                            QR Scanner
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="Features-Section"
                            className={activeSection === 'Features-Section' ? 'selected-section-style' : ''}
                            smooth={true}
                            duration={1000}
                            offset={-100}
                        >
                            Features
                        </Link>
                    </li>
                </ul>
            </div>
        </div>

        </>
    );
};

export default Navbar;