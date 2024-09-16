import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
    return (
        <>
            <div className="footer" id="footer">
                <div className="footer-content">
                    <div className="footer-content-left">
                        <img src={assets.logo} alt="" />
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
                            iusto dolore unde rem perspiciatis, quae libero? Nam minus sit
                            aliquid, consequuntur sed, odit dolorem ratione ut, suscipit
                            minima non eum?
                        </p>
                        <div className="social-media-icons">
                            <img src={assets.facebook_icon} alt="" />
                            <img src={assets.linkedin_icon} alt="" />
                            <img src={assets.twitter_icon} alt="" />
                        </div>
                    </div>
                    <div className="footer-content-middle">
                        <h2>COMPANY</h2>
                        <ul>
                            <li>Home</li>
                            <li>Menu</li>
                            <li>Mobile-app</li>
                            <li>Contact-us</li>
                        </ul>
                    </div>
                    <div className="footer-content-right">
                        <h2>STAY CONNECTED</h2>
                        <ul>
                            <li>+91 9348973829</li>
                            <li>foodie@gmail.com</li>
                        </ul>
                    </div>
                </div>
                <hr />
                <p className="copyright">Copyright @ foodie. co limited</p>
            </div>
        </>
    );
};

export default Footer;
