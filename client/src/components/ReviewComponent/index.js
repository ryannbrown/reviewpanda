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
    // console.log(newRating, "for the win")
    this.setState({
      rating: newRating
    });
  }

  enableButton = () => {
    this.setState({ buttonDisabled: false });
  };

  activateEditor = () => {
    // console.log("clicked")
  }

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
    // console.log(ourContext.userData.email);
    fetch(
      `/api/review/${this.props.test_uuid}/user/${this.props.currentUser}`
    )
      .then((res) => res.json())
      .then((json) => {
        // console.log(json)
        if (json == "error getting review") {
          // console.log("user does not have review")
          this.setState({
            isLoading: false,
            userHasReviewed: false,
          });
        } else {
          // console.log("this is my review", json);
          this.setState({
            myReview: json[0],
            userHasReviewed: true,
            isLoading: false,
            // truthyReviews: true
          });
        }
      });
  };


  componentDidMount() {
   
    this.fetchMyReview();
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
      //  console.log(review.rating)
     })
     var total = 0
     for(var i = 0; i < sum.length; i++) {
        total += sum[i];
        // console.log(total)
    }
    // console.log(total, sum.length)
    var numReviews = sum.length;
    var avg = total / sum.length;
    var theAvg = (Math.round(avg * 100) / 100).toFixed(2);
    // console.log(theAvg)
    //  console.log(avg)
 }



    if (reviews) {
        // console.log(truthyReviews, reviews)
        var items = reviews.map((item, i) => (
          <div key={i} className="single-review">
           <Link to={`/profile/${item.user_uuid}`}><div className="review-avatar" style={{backgroundImage:`url('${item.avatar}')`}}></div></Link>
           <div className="single-review-content">
               <div className="single-review-heading">
                   <a>{item.full_name}</a>
                   <p>|</p>
                   <p className="desktop-date">{format(new Date(item.date_posted), "eeee, MMM dd yyyy")}</p>
                   <p className="desktop-hash">|</p>
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
               <p className="mobile-date">{format(new Date(item.date_posted), "eeee, MMM dd yyyy")}</p>
               <div className="single-review-description"
               dangerouslySetInnerHTML={{__html: item.description}}
               >
                   {/* {item.description} */}
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
