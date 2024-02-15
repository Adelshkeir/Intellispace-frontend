import "./homepage.css";
import eufy from "../../assets/eufy.png";
import Curatorspickcarousel from "./curatorspickcarousel";
import desk from "../../assets/desk.png"
import b1 from "../../assets/b1.png"
import b2 from "../../assets/b2.png"
import b3 from "../../assets/b3.png"
import  { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="homepage-main">
      <div className="homepage-firstsection" data-aos="fade-up">
        <div className="homepage-firstsection-info">
          <p>EUFY VIDEO CAMERA 2K</p>
          <h1 className="homepage-firstsection-title">
            See Who's There <br /> Before The Ring
          </h1>
          <p>
            Get instant alerts for anyone who approaches,
            <br /> even if they don't press the doorbell.
          </p>
          <button>Buy Now</button>
        </div>
        <img src="https://protecsecuritysystems.com/wp-content/uploads/cache/2019/09/home-security-camera-front-home/2336279802.jpg" />
      </div>

      <div className="homepage-secondsection" data-aos="fade-up">
        <img src="https://9to5mac.com/wp-content/uploads/sites/6/2019/05/categories-of-smart-home-tech.jpg?quality=82&strip=all" />
        <img src="https://img.freepik.com/premium-photo/smart-home-interface-with-augmented-realty-iot-object-interior-design_756748-3157.jpg" />
      </div>

      <h1 className="curators-pick-title">Shop Our Curator's Picks</h1>

      <div className="curatorspick-carousel">
        <Curatorspickcarousel />
      </div>
      <div className="homepage-viewall">
        <button>view all products</button>
      </div>

<div className="homepage-categories" data-aos="fade-up">



<div className="homepage-category1" style={{backgroundImage: `url(${b1})`}}>
<p>SECURITY CAMERAS</p>
<h4 style={{color:"#f45555"}}>Smart Security</h4>
<h4>here, there, everywhere</h4>
</div>

<div className="homepage-category2" style={{backgroundImage: `url(${b2})`}}>
<p>ALARM SYSTEMS</p>
<h4 >A versatile and</h4>
<h4 style={{color:"#83c99f"}}>reliable solution</h4>
</div>


<div className="homepage-category3" style={{backgroundImage: `url(${b3})`}}>
<p>SMART APPS</p>
<h4 style={{color:"#735dcc"}}>Control your system</h4>
<h4>from an app</h4>
</div>



</div>

<div className="homepage-lastpart" data-aos="fade-up">
<img src={desk}/>
<div className="homepage-lastpart-info">
<h3>Do you have any questions
about our products?</h3>
<p>
Then do not hesitate to contact us. Our support
team will be happy to answer your question.
Usually within one to two working days.
</p>

<button className="homepage-lastpart-button">Contact us</button>
</div>

</div>


    </div>
  );
};

export default Home;
