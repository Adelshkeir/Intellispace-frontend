import "./aboutus.css";
import aboutusimg from "../../assets/aboutus.png";
import aboutusimg2 from "../../assets/aboutus2.png";
import aboutusimg3 from "../../assets/aboutus3.png";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
const Aboutus = () => {


    useEffect(() => {
        AOS.init({ duration: 2000 });
      }, []);


  return (


    
    <div className="aboutusmain">
      <div className="aboutusinfo">
      <div className="aboutusinfo-section" data-aos="fade-right">
          {/* ... */}
          <img src={aboutusimg} className="aboutusimg" />

          <div className="aboutusinfo-part">
            <h1>Our Mission</h1>
            <h5>
              At Intelispace, our mission is to revolutionize the way you
              interact with your home. We strive to provide innovative and
              user-friendly smart home devices that enhance convenience,
              security, and energy efficiency
            </h5>
          </div>
        </div>

        <div className="aboutusinfo-section" data-aos="fade-up">
          <div className="aboutusinfo-part">
            <h1>Our Technology</h1>
            <h5>
              With cutting-edge advancements in IoT and AI, we are dedicated to
              creating seamlessly integrated smart home solutions. Our devices
              are designed to adapt to your lifestyle, learn your preferences,
              and simplify daily routines.
            </h5>
          </div>

          <img src={aboutusimg2} className="aboutusimg" />
        </div>
        <div className="aboutusinfo-section" data-aos="fade-left">
          <img src={aboutusimg3} className="aboutusimg" />

          <div className="aboutusinfo-part">
            <h1>Customer Satisfaction</h1>
            <h5>
              Customer satisfaction is at the core of our business. We are
              committed to delivering reliable products and exceptional support.
              Your peace of mind and satisfaction with our smart home devices
              are our top priorities
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
