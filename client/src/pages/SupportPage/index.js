import React, { Component } from "react";
import "./style.css";
import ReviewControls from "../../components/ReviewControls";
import StarRatings from "react-star-ratings";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import SavedTests from "../../components/SavedTests/index";
import uniq from 'lodash/uniq';
import _ from 'lodash'
import './style.css'

import {
  ThemeContextConsumer,
  ThemeContextProvider,
} from "../../utils/themeContext";
var format = require("date-fns/format");

class SupportPage extends Component {
  static contextType = ThemeContextConsumer;
  constructor(props) {
    super(props);
    this.state = {
      //   savedTests: []
    };
  }


  render() {
      return(
    <div className="support-page">
        <div className="support-content">
<h1>Experiencing Issues on Review Panda?</h1>
<p>Shoot us a message and we will help you as soon as possible!</p>
<p>Your input is valuable to us.</p>
        <form
          // onSubmit={this.handleSubmit}
          action="https://getform.io/f/6ac3031f-0cf4-4ee8-bca8-b61aa15e16c0" method="POST"
          className="connect-form"
          encType="multipart/form-data"
        >
       
            <input name="email" ref={this.email} type="text" placeholder="Email" />
            <input name="firstname" ref={this.firstName} type="text" placeholder="First Name" />
            <textarea
            name="message"
              ref={this.message}
              rows="5"
              placeholder="Type your message here..."
            />
          <button type="submit" className="login-btn btn" variant="outline-dark">SEND <i class="lni lni-pointer"></i></button>
        </form>
        </div>
    </div>
      )
    
    }
}


export default SupportPage;
