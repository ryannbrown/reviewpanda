import React, { Component } from "react";
import { Link } from "react-router-dom";
import MyReview from "../../components/MyReview/index";
import ClipLoader from "react-spinners/ClipLoader";
import {
  ThemeContextConsumer,
  ThemeContextProvider,
} from "../../utils/themeContext";
import "./style.css";

class ReviewControls extends Component {
  static contextType = ThemeContextConsumer;
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      myReview: [],
      truthyReviews: false,
      userHasReviewed: false,
      buttonDisabled: false
    };
    this.rating = React.createRef();
    this.description = React.createRef();
  }

 

  fetchMyReview = () => {
    this.setState({isLoading:true})
    const ourContext = this.context;
    console.log(ourContext.userData.email);
    fetch(`/api/review/${this.props.id}/user/${this.props.currentUser}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.length > 0) {
          this.setState({
            myReview: json[0],
            userHasReviewed: true,
            isLoading:false
            // truthyReviews: true
          });
        } else {
          this.setState({
            isLoading:false
          })
        }
      });
  };
  submitReview = (e) => {
// prevent multiple clicks
    if (this.state.disabled) {
      return;
    }
    this.setState({
      disabled:true
    })
  // end prevent multiple clicks

    let ourContext = this.context;
    e.preventDefault();
    let id = this.props.id;
    let rating = this.rating.current.value;
    let description = this.description.current.value;
    let email = ourContext.userData.email;

    fetch("/api/postreview", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: ourContext.userData.email,
        id: id,
        rating: rating,
        description: description,
      }),
    }).then((response) => {
      this.props.fetchReviews();
      // console.log("hey i did it")
      console.log(response);
      if (response.status == "200") {
     this.setState({
       userHasReviewed:true,
       isLoading:false
     })
     this.fetchMyReview();
        // this.fetchReviews();
        // alert("success")
      } else if (response.status ==! "200") {
        alert("there was an error");
      }
    });
  };

  componentDidMount() {
    // this.fetchReviews();
    this.fetchMyReview();
  }

  render() {
    // console.log(this.state.reviews)
    const {
      isLoading,
      reviews,
      truthyReviews,
      userHasReviewed,
      myReview,
    } = this.state;




    if (isLoading) {
      return (
        <div className="loading-block">
          <ClipLoader
            // css={override}
            className="clippy"
            size={35}
            color={"#196196"}
            // loading={this.state.loading}
          />
        </div>
      );
    } else
    return (
      <div className="reviews-comp">
        {!userHasReviewed ? (
          <div>
            {" "}
            <h1>Leave a Review!</h1>
            <form className="actual-form" onSubmit={this.submitReview}>
              <input
                ref={this.rating}
                placeholder="rating 1-5"
                type="number"
              ></input>
              <textarea
                ref={this.description}
                placeholder="write description for package"
              ></textarea>
              <button disabled={this.state.disabled}className="btn login-btn" type="submit">Submit Review</button>
            </form>
          </div>
        ) : (
          <MyReview myReview={myReview} id={this.props.id}></MyReview>
        )}

      </div>
    );
  }
}
export default ReviewControls;
