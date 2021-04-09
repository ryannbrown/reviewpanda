import React, { Component } from 'react';

import { LinkedIn } from 'react-linkedin-login-oauth2';
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png'
import axios from "axios"
import { LinkedInLoginButton } from "react-social-login-buttons";
import {
  ThemeContextConsumer,
  ThemeContextProvider,
} from "../../utils/themeContext";


export default class LinkedInPage extends Component {
  static contextType = ThemeContextConsumer;
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      errorMessage: '',
    };
  }



//   handleSuccess = (data) => {
//       console.log(data.code)
//     this.setState({
//       code: data.code,
//       errorMessage: '',
//     });
//   }

//   handleFailure = (error) => {
//     this.setState({
//       code: '',
//       errorMessage: error.errorMessage,
//     });
//   }

  fetchStuff = (code) => {
    // var myHeaders = new Headers();

    fetch("/testme", {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          code: code
      })
  }).then(response => {
    console.log(response)
      // console.log("hey i did it")
      // console.log(response)
      // if (response.status == '200') {
      //     this.setState({
      //         itemPosted: true
      //     })
      // }
  })
}

  componentDidMount() {
    
}
  

 
  render() {

    // const query = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&state=987654321&scope=r_liteprofile,r_emailaddress&client_id=77vmr4j9fldtav&redirect_uri=https%3A%2F%2Freviewpanda.herokuapp.com`t
    const { code, errorMessage } = this.state;
    return (
      <div style={{display:'flex', justifyContent:'center'}}>
      {/* <a href={`https://www.linkedin.com/oauth/v2/authorization?response_type=code&state=987654321&scope=r_liteprofile,r_emailaddress&client_id=77vmr4j9fldtav&redirect_uri=https%3A%2F%2Freviewpanda.herokuapp.com`}><button>Login with Linked IN</button></a> */}
      <a href={`https://www.linkedin.com/oauth/v2/authorization?response_type=code&state=987654321&scope=r_liteprofile,r_emailaddress&client_id=77vmr4j9fldtav&redirect_uri=https%3A%2F%2Freviewpanda.herokuapp.com`}><LinkedInLoginButton align='center' style={{width:'200px'}}>
      <span>{this.props.text}</span></LinkedInLoginButton></a>
      </div>
    );
  }
}