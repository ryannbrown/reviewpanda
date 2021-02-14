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
      buttonDisabled: false,
    };
    this.rating = React.createRef();
    this.description = React.createRef();
  }

  enableButton = () => {
    this.setState({ buttonDisabled: false });
  };

  fetchFromDelete = () => {
          this.setState({
            userHasReviewed: false,
          });
          this.props.fetchReviews();
          this.enableButton();
        }
      // });
  // };

  fetchMyReview = () => {
    this.setState({
      myReview: [],
      userHasReviewed: false,
      //  reviews: []
    });
    this.setState({ isLoading: true });
    const ourContext = this.context;
    console.log(ourContext.userData.email);
    fetch(
      `/api/review/${this.props.test_uuid}/user/${this.props.currentUser}`
    )
      .then((res) => res.json())
      .then((json) => {
        // console.log(json)
        if (json == "error getting review") {
          console.log("user does not have review")
          this.setState({
            isLoading: false,
            userHasReviewed: false,
          });
        } else {
          console.log("this is my review", json);
          this.setState({
            myReview: json[0],
            userHasReviewed: true,
            isLoading: false,
            // truthyReviews: true
          });
        }
      });
  };
  submitReview = (e) => {
    // prevent multiple clicks
    if (this.state.buttonDisabled) {
      return;
    }
    this.setState({
      buttonDisabled: true,
    });
    // end prevent multiple clicks

    let ourContext = this.context;
    e.preventDefault();
    // let id = this.props.id;
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
        title: this.props.thisTest.title,
        email: ourContext.userData.email,
        test_uuid: this.props.thisTest.uuid,
        rating: rating,
        description: description,
      }),
    }).then((response) => {
      this.props.fetchReviews();
      // console.log("hey i did it")
      console.log(response);
      if (response.status == "200") {
        this.setState({
          userHasReviewed: true,
          isLoading: false,
        });
        this.fetchMyReview();
        // this.fetchReviews();
        // alert("success")
      } else if (response.status == !"200") {
        alert("there was an error");
      }
    });
  };

  componentDidMount() {
    // this.fetchReviews();
    this.fetchMyReview();
  }

  componentDidUpdate() {
    console.log("controls updated", this.state);
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
                <button
                  disabled={this.state.buttonDisabled}
                  className="btn login-btn"
                  type="submit"
                >
                  Submit Review
                </button>
              </form>
            </div>
          ) : (
            <MyReview
              fetchFromDelete={this.fetchFromDelete}
              enableButton={this.enableButton}
              fetchMyReview={this.fetchMyReview}
              fetchReviews={this.props.fetchReviews}
              myReview={myReview}
              id={this.props.id}
            ></MyReview>
          )}
        </div>
      );
  }
}
export default ReviewControls;
