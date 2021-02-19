import React, { useState, setShow, Component } from "react";
import {
  Card,
  ListGroup,
  ListGroupItem,
  Button,
  Image,
  CardDeck,
  Table,
  Accordion,
  Spinner,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";
import {
  ThemeContextConsumer,
  ThemeContextProvider,
} from "../../utils/themeContext";
import "./style.css";
// import {circle} from "../../../node_modules/feather-"

import exitBtn from "../../media/x.svg"

class LoginModal extends Component {
  static contextType = ThemeContextConsumer;
  constructor(props) {
    super(props);
    this.state = {
      state: "hello I am Home's state",
      modalOpened: false,
      registrationToggled: false,
      showLoginAlert: false,
      showRegisterAlert:false
      //   loggedInState: this.props.loggedInState,
      //   user: null,
      //   userLoggedIn: this.props.userLoggedIn
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
    // this.fileChanged = this.fileChanged.bind(this);
    // this.id = React.createRef();
    this.first_name = React.createRef();
    this.last_name = React.createRef();
    this.email = React.createRef();
    this.password = React.createRef();
    this.verPassword = React.createRef();
    this.isSubscribed = React.createRef();
  }

   toggleRegister = () => {
    this.setState({
      registrationToggled: !this.state.registrationToggled
  })
  }

  toggleOpen = () => {
    this.setState({
      opened: !this.state.opened,
    });
  };

  //   handleClose = () => {
  //     // console.log("clicked")
  //     this.setState({
  //      opened: false
  //     });
  //   };

  //   handleOpen = () => {
  //     this.setState({
  //       show: true,
  //       setShow: true,
  //     });
  //   };

  handleLogin = (e) => {
    const ourContext = this.context;
        e.preventDefault()
        let email = this.email.current.value
        let password = this.password.current.value

    // console.log(email, password)

    const userPassword = [];

    e.preventDefault();
    // console.log("handled it")

    const signIn = () => {
      // console.log("posting to DB")
      // POST TO DB
      fetch("/api/signin", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // first_name: first_name,
          // last_name: last_name,
          email: email,
          password: password,
        }),
      }).then((response) => {
        // console.log("hey i did it")
        // console.log(response)
        if (response.status == "200") {
          ourContext.activateUser(email);
          console.log(response)
          // console.log(email)
          this.props.toggleModal();
          // if (this.props.userLoggedIn) {
        //   this.setState({
        //     // userLoggedIn: true,
        //     // user: email,
        //     show: false,
        //     setShow: false,
        //     showRegisterAlert: false,
        //   });
          // }
          // console.log(email);

          // sessionStorage.setItem("name", postData.name);
          // sessionStorage.setItem("email", email);
          // sessionStorage.setItem("loggedIn", true);

          //   this.props.action(email);
          // alert("success")
        } else if (response.status == "400") {
          this.setState({
            showLoginAlert: true,
          });
        }
      });
    };
    signIn();
  };


  handleRegistration = (e) => {
    const ourContext = this.context;
        e.preventDefault()
        let first_name = this.first_name.current.value
        let last_name = this.last_name.current.value
        let email = this.email.current.value
        let password = this.password.current.value
        let verPassword = this.verPassword.current.value
        let isSubscribed = this.isSubscribed.current.checked

    // console.log(email, password)

    const userPassword = [];

    e.preventDefault();
    // console.log("handled it")

    const regUser= () => {
      // console.log("posting to DB")
      // POST TO DB
      fetch("/api/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password,
          subscribed: isSubscribed
        }),
      }).then((response) => {
        // console.log("hey i did it")
        // console.log(response)
        if (response.status == "200") {
            ourContext.activateUser(email);
        //   ourContext.activateUser(email);
          // console.log(email)
          this.props.toggleModal();
          // if (this.props.userLoggedIn) {
          this.setState({
            // userLoggedIn: true,
            // user: email,
            show: false,
            setShow: false,
            showRegisterAlert: false,
          });
          // }
          // console.log(email);

          // sessionStorage.setItem("name", postData.name);
          // sessionStorage.setItem("email", email);
          // sessionStorage.setItem("loggedIn", true);

          //   this.props.action(email);
          // alert("success")
        } else if (response.status == "400") {
          this.setState({
            showRegisterAlert: true,
          });
        }
      });
    };
    if (password === verPassword) {
        regUser()
    } else {
        alert("passwords did not match")
    }
  };

  logOut = () => {
    this.setState({
      loggedIn: false,
    });
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("email");
    window.location.reload();
  };

  componentDidMount() {
    //   var ourContext = this.context;
    //   console.log(ourContext)
  }

  render() {

    const {showRegisterAlert, showLoginAlert} = this.state;
    return (
      <div className="modal-background">
        <div className="modal-box">
          <img className="modal-exit-btn" src={exitBtn} onClick={this.props.toggleModal}></img>
          <div className="modal-content">
            {/* Login Form */}
            {!this.state.registrationToggled ? (
              <form className="actual-form" onSubmit={this.handleLogin}>
                     
                <h1>Login</h1>
                <input ref={this.email} placeholder="email" />
                <input type="password" ref={this.password} placeholder="password" />
                <button className="modal-btn btn" >Sign In</button>
                {showLoginAlert && <div className="alert alert-danger">Incorrect email or password</div>}
                <p>First Time?</p>
                <button className="modal-btn btn" type="submit" onClick={this.toggleRegister}>Register</button>
              </form>
            ) :
           
             (   
              <form className="actual-form registration" onSubmit={this.handleRegistration}>
                    {/* Registration Form */} 
                <h1>Register</h1>
                <input ref={this.first_name} name="first" placeholder="First Name" />
                <input ref={this.last_name} name="last" placeholder="Last Name" />
                <input ref={this.email} name="email" placeholder="Email" />
                <input type="password" ref={this.password} placeholder="Password" />
                <input type="password" ref={this.verPassword} placeholder="Verify Password" />
                <div className="form-checkbox">
                <label>Subscribe?</label>
                <input ref={this.isSubscribed} type="checkbox"></input>
                </div>
                <button className="modal-btn btn" type="submit">Register</button>
                {showRegisterAlert && <div className="alert alert-danger">This email may already exist in our system</div>}
              </form>
            )}
           
          </div>
        </div>
      </div>
    );
  }
}
export default LoginModal;
