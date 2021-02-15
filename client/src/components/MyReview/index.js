import React, { Component } from "react";
import {Link} from "react-router-dom"
import StarRatings from 'react-star-ratings';
import {
    ThemeContextConsumer,
    ThemeContextProvider,
  } from "../../utils/themeContext";
import './style.css'
import exitBtn from "../../media/feather/trash.svg"

class MyReview extends Component {
    static contextType = ThemeContextConsumer;
  constructor(props) {
    super(props);
    this.state = {
      myReview: [],
      itemDeleted:false,
      rating: this.props.myReview.rating || 0
      // truthyReviews: false
    };
    // this.rating = React.createRef();
    this.description = React.createRef();
  }



  changeRating = ( newRating, name ) => {
    console.log(newRating, "for the win")
    this.setState({
      rating: newRating
    });
  }

  deleteMyReview = () => {
      console.log("deleting review")
      // POST TO DB
      fetch('/api/remove_review', {
          method: 'DELETE',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              review_uuid: this.props.myReview.review_uuid,
          })
      })
      .then((res) => {
        console.log(res)
      if (res.status == '200') {
   
        this.props.fetchFromDelete();
      } else {
      }
    })
  }


 updateReview = (e) => {
  e.preventDefault();

    let ourContext = this.context;
  
    // let id = this.props.id;
    let rating = this.state.rating
    let description = this.description.current.value;
    let email = ourContext.userData.email;

    console.log(email, rating, description)
    fetch("/api/updatereview", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        review_uuid: this.props.myReview.review_uuid,
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
        this.props.fetchMyReview();
        // this.fetchReviews();
        // alert("success")
      } else if (response.status == !"200") {
        alert("there was an error");
      }
    });
  };



  componentDidMount() {
      console.log(this.props.myReview)
  }

  render() {
    // console.log(this.state.reviews)
    const { myReview} = this.props;

    return (
      <div className="reviews-comp">
           <i class="lni lni-trash review-delete-btn"  onClick={this.deleteMyReview}></i>
          <h1> My Review
          </h1>
          {/* <div>
              <h3>Rating: {myReview.rating}</h3>
              <h3>Description: {myReview.description}</h3>
          </div> */}

<h3>Rating</h3>
<StarRatings
              rating={this.state.rating}
              starRatedColor="#77E0D4"
              changeRating={this.changeRating}
              numberOfStars={5}
              name='updated-rating'
              starDimension = '25px'
              starEmptyColor='rgba(119,224,212, .25)'
              starHoverColor='rgba(119,224,212)'
            />

                <h3>Description</h3>

<form className="actual-form" onSubmit={this.updateReview}>
                {/* <input
                  ref={this.rating}
                  placeholder="rating 1-5"
                  type="number"
                ></input> */}



                <textarea
                  ref={this.description}
                  defaultValue={myReview.description}
                ></textarea>
                <div>
                <button
                  // disabled={this.state.buttonDisabled}
                  className="btn login-btn"
                  type="submit"
                >
                  Update Review
                </button>
                <i class="lni lni-heart review-heart"></i>
                </div>
                <p className="under-text"><i>Feel free to edit your review above!</i></p>
              </form>
      </div>
    );
  }
}
export default MyReview;
