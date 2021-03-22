
import React, { Component } from 'react';

import './style.css';
// import profPic from "../../media/5.PNG"
import logo from "../../media/mainlogo.png"
// import heroImg from "../../media/sand-beach.png"
import fbLogo from "../../media/icons/facebook.svg"
import instaLogo from "../../media/icons/instagram.svg"

export default class Footer extends Component {

  constructor(props) {
    super(props);

    this.listener = null;
    this.state = {
      status: "top"
    };
  }


  componentDidMount() {
 
  }

  componentDidUpdate() {
    document.removeEventListener("scroll", this.listener);
  }

  render() {

    return (
      <div className="footer">
        <div className="footer-content">
        <div>
            <img src={logo}></img>
        </div>
        <div className="contact-info">
            <p>Review Panda </p>
            <p>reviewpanda.net</p>
            <p>Stirred up by Just Soup</p>
        </div>
        <div>
            <p>Stay in touch!</p>
            <form><input placeholder="Enter Email"></input><button>Subscribe</button></form>
            <div className="social-wrapper">
                <a href="/"><img src={instaLogo}></img>
                    </a>
                <a href="/"><img src={fbLogo}></img>
                    </a>
            </div>
            </div>
        </div>
        </div>

    )

  }
}