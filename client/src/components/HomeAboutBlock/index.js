import React, { Component } from "react";
import "./style.css";
// import profPic from "../../media/5.PNG"
import img from "../../media/about.jpg";
import {Link} from "react-router-dom"
export default class HomeAboutBlock extends Component {
  constructor(props) {
    super(props);
    this.listener = null;
    this.state = {
      status: "top",
    };
  }
  componentDidMount() {}
  componentDidUpdate() {
    document.removeEventListener("scroll", this.listener);
  }
  render() {
    return (
      <div>
        <div
          className="home-about-block"
          style={{
            // backgroundImage: `url(${heroImg})`,
            backgroundColor: `white`,
            opacity: `100%`,
            backgroundBlendMode: `multiply`,
            backgroundPosition: `center`,
            backgroundSize: `cover`,
            backgroundRepeat: `no-repeat`,
            backgroundAttachment: `fixed`,
            // height: `${this.props.height}`,
            // height: `100vh`,
            display: `flex`,
            alignItems: `center`,
            position: `relative`,
            justifyContent: "center",
          }}
        >
          {/* <img className="hero-logo" src={logo}></img> */}
          <div className="about-content">
            <div className="auth-pic">
              <img className="auth-img" src={img}></img>
            </div>
            <div className="auth-text">
              <h2>Review Panda</h2>
              <p>Created by practitioners, for practitioners</p>
              <Link to="/about"><button>Learn More</button></Link>
            </div>
          </div>
          <br></br>
          {/* <p style={{color:'#123047'}} className="action-button">February 2021</p> */}
        </div>
      </div>
    );
  }
}
