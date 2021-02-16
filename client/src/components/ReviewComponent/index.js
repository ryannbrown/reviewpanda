import React, { Component } from "react";
import { Link } from "react-router-dom";
import MyReview from "../../components/MyReview/index";
import StarRatings from 'react-star-ratings';
import ClipLoader from "react-spinners/ClipLoader";

import {
  ThemeContextConsumer,
  ThemeContextProvider,
} from "../../utils/themeContext";
import "./style.css";
var format = require('date-fns/format')
class ReviewComponent extends Component {
  static contextType = ThemeContextConsumer;
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      myReview: [],
      truthyReviews: false,
      userHasReviewed: false,
      buttonDisabled: false,
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




    const {
        reviews,
        isLoading
      } =  
      this.props;

 if (reviews) {
     let sum = []
     reviews.forEach(function(review) {
         sum.push(review.rating)
       console.log(review.rating)
     })
     var total = 0
     for(var i = 0; i < sum.length; i++) {
        total += sum[i];
        console.log(total)
    }
    console.log(total, sum.length)
    var numReviews = sum.length;
    var avg = total / sum.length;
    var theAvg = (Math.round(avg * 100) / 100).toFixed(2);
    console.log(theAvg)
    //  console.log(avg)
 }



    if (reviews) {
        // console.log(truthyReviews, reviews)
        var items = reviews.map((item, i) => (
          <div key={i} className="single-review">
           <div className="review-avatar" style={{backgroundImage:`url(${item.avatar}`}}></div>
           <div className="single-review-content">
               <div className="single-review-heading">
                   <a>{item.full_name}</a>
                   <p>|  {format(new Date(item.date_posted), "eeee, MMM i yyyy")}  |</p>
                   <StarRatings
              rating={item.rating}
              starRatedColor="#77E0D4"
            //   changeRating={this.changeRating}
              numberOfStars={5}
              name='updated-rating'
              starDimension = '11px'
              starSpacing='1px'
              starEmptyColor='rgba(142,142,142, .25)'
              starHoverColor='rgba(142,142,142)'
              starRatedColor='#8E8E8E'
            />
               </div>
               <div className="single-review-description">
                   {item.description}
               </div>
           </div>
          </div>
        ));
      }



    // if (isLoading) {
    //   return (
    //     <div className="loading-block">
    //       <ClipLoader
    //         // css={override}
    //         className="clippy"
    //         size={35}
    //         color={"#196196"}
    //         // loading={this.state.loading}
    //       />
    //     </div>
    //   );
    // } else
      return (
        <div className="reviews-wrapper">
       {reviews.length > 0 ? (
            <div>
                <div className="reviews-header">
                <h1>Reviews</h1>
                <p>{theAvg} ({numReviews} Reviews)</p>
                </div>
                {items}
            
            
            
            </div>





          ) : (
            <h1>There are no reviews yet. Be the first!</h1>
          )}
          </div>
      );
  }
}
export default ReviewComponent;
