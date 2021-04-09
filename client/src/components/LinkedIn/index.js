import React, { Component } from 'react';

import { LinkedIn } from 'react-linkedin-login-oauth2';
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png'
import axios from "axios"
const queryString = require('querystring');

export default class LinkedInPage extends Component {
  state = {
    code: '',
    errorMessage: '',
  };


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
      console.log("did it!")
     let string = queryString.parse(window.location.search);
     let code = string["?code"];
     console.log("string", string["?code"])
//      this.setState({
// code: code
//      })
    //   console.log(querystring)
if (code) {


    // console.log('clicked')
    fetch('/api/linkedin', {
      method: 'POST',
      body: JSON.stringify({
       code:code
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(res => res.json())
      .then((response) => console.log(response))
      // .then((json) => console.log("json", json));
}
  }
  

 
  render() {

    // const query = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&state=987654321&scope=r_liteprofile,r_emailaddress&client_id=77vmr4j9fldtav&redirect_uri=https%3A%2F%2Freviewpanda.herokuapp.com`
    const { code, errorMessage } = this.state;
    return (
      <div>
      {/* <a href={`https://www.linkedin.com/oauth/v2/authorization?response_type=code&state=987654321&scope=r_liteprofile,r_emailaddress&client_id=77vmr4j9fldtav&redirect_uri=https%3A%2F%2Freviewpanda.herokuapp.com`}><button>Login with Linked IN</button></a> */}
      <a href={`https://www.linkedin.com/oauth/v2/authorization?response_type=code&state=987654321&scope=r_liteprofile,r_emailaddress&client_id=77vmr4j9fldtav&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F`}><button>Login with Linked IN</button></a>
      </div>
    );
  }
}