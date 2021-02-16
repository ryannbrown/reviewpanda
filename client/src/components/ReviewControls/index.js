import React, { Component } from "react";
import { Link } from "react-router-dom";
import MyReview from "../../components/MyReview/index";
import LoginModal from "../LoginModal/index"
import StarRatings from 'react-star-ratings';
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
      showLoginAlert: false,
      rating: 0
    };
    this.description = React.createRef();
  }


  changeRating = ( newRating, name ) => {
    console.log(newRating, "for the win")
    this.setState({
      rating: newRating
    });
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
    // const ourContext = this.context;
    // console.log(ourContext.userData.email);
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
    let rating = this.state.rating
    let description = this.description.current.value;
    let email = ourContext.userData.email;
    fetch("/api/postreview", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name:ourContext.userData.first_name + " " +ourContext.userData.last_name,
        title: this.props.thisTest.title,
        email: ourContext.userData.email,
        test_uuid: this.props.thisTest.uuid,
        avatar: ourContext.userData.avatar,
        rating: rating,
        description: description,
      }),
    }).then((response) => {
      this.props.fetchReviews();
      // console.log("hey i did it")
      console.log("review response", response);
      if (response.status == "200") {
        this.setState({
          userHasReviewed: true,
          isLoading: false,
        });
        this.fetchMyReview();
        // this.fetchReviews();
        // alert("success")
      } else if (response.status !== "200") {
        this.setState({showLoginAlert: true})
      }
    });
  };

  componentDidMount() {
    
  }

  componentDidUpdate(prevProps) {
    //Typical usage, don't forget to compare the props
    if (this.props.currentUser !== prevProps.currentUser) {
       this.fetchMyReview(this.props.currentUser);
    }
   }

  render() {


    // console.log(this.state.reviews)
    const {
      isLoading,
      reviews,
      truthyReviews,
      userHasReviewed,
      myReview,
      showLoginAlert,
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
        <ThemeContextConsumer>
        {(context) => (
        <div className="reviews-comp">
          {!userHasReviewed ? (
            <div>
              {" "}
              <h2>Leave a review, get rewarded!</h2>
              <p>Leave a review and you’ll get entered to win one of the prizes below.</p>
              <h3>Rating</h3>
                  <StarRatings
              rating={this.state.rating}
              starRatedColor="#77E0D4"
              changeRating={this.changeRating}
              numberOfStars={5}
              name='rating'
              starDimension = '25px'
              starEmptyColor='rgba(119,224,212, .25)'
              starHoverColor='rgba(119,224,212)'
            />
              <form className="actual-form" onSubmit={this.submitReview}>
                {/* <input
                  ref={this.rating}
                  placeholder="rating 1-5"
                  type="number"
                ></input> */}
                <h3>Description</h3>
                <textarea
                  ref={this.description}
                  placeholder="write description for this solution"
                ></textarea>
                <div>
                  {showLoginAlert && !context.userData.email && <p style={{color: '#ff5959'}}>Please login/register to contribute on Review Panda!</p>}
                <button
                  disabled={this.state.buttonDisabled}
                  className="btn login-btn"
                  type="submit"
                >
                  Submit Review
                </button>
                {!this.props.testSaved ?   <i onClick={this.props.saveTest} className="lni lni-heart review-heart"></i> : <i class="lni lni-checkmark-circle review-heart"></i> }
                {/* <i class="lni lni-heart review-heart"></i> */}
                </div>
                <p className="under-text"><i>Don’t have time to leave a review? Save to submit later!</i></p>
              </form>
                <h2>Our Prizes</h2>
              <div className="prize-box">
                <div className="prize-item"> <span>Apple</span> <span>EarBuds</span></div>
                <div className="prize-item"><span>Airbnb</span>Gift Card</div>
                <div className="prize-item"><span>Visa</span> Gift Card</div>
              </div>
            </div>
          ) : (
            <MyReview
            // myRating = {this.state.rating}
            fetchMyReview= {this.fetchMyReview}
            thisTest={this.props.thisTest}
              fetchFromDelete={this.fetchFromDelete}
              enableButton={this.enableButton}
              fetchMyReview={this.fetchMyReview}
              fetchReviews={this.props.fetchReviews}
              myReview={myReview}
              id={this.props.id}
            ></MyReview>
          )}
          
        </div>
              )}
              </ThemeContextConsumer>
      );
  }
}
export default ReviewControls;
