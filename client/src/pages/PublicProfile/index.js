import React, { Component } from "react";
import "./style.css";
import ReviewControls from "../../components/ReviewControls";
import StarRatings from "react-star-ratings";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import SavedTests from "../../components/SavedTests/index";
import uniq from 'lodash/uniq';
import _ from 'lodash'

import {
  ThemeContextConsumer,
  ThemeContextProvider,
} from "../../utils/themeContext";
var format = require("date-fns/format");

class PublicProfile extends Component {
  static contextType = ThemeContextConsumer;
  constructor(props) {
    super(props);
    this.state = {
        userData: [],
      reviews: [],
      numOfReviews: null,
      pageReady: false,
      //   savedTests: []
    };
  }

  fetchMyReviews = () => {
    //   if (!uuid) {
        let uuid = this.props.match.params.uuid
        console.log(uuid)
    //   }
    fetch(`/api/users_reviews/${uuid}`)
      .then((res) => res.json())
      .then((json) => {
        console.log("reviews", json);
        if (json == "error getting review") {
          this.setState({
            reviews: [],
          });
        } else {
          this.setState({
            reviews: json,
            numOfReviews: json.length,
            pageReady:true
            // userHasReviewed: false,
          });
          //grabbin email from first review and then using that to fetch user data
          this.fetchUserProfile(json[0].email)
        }
      });
  };

  fetchUserProfile = (email) => {
    fetch(`/api/profile/${email}`)
    .then(res => res.json())
    .then(json => {
        // console.log(json)
      this.setState({
        userData: json,
      })

    })
  }



 

//   fetchUserData = (email) => {
//     let ourContext = this.context;
//     ourContext.fetchUserData();
//   };

  componentDidMount() {
this.fetchMyReviews();
 
  }



  render() {
    const { pageReady, reviews, numOfReviews, savedTests } = this.state;

    if (reviews) {
        console.log(reviews)
      // console.log(truthyReviews, reviews)
      var items = reviews.map((item, i) => (
        <div key={i} className="single-review">
        {/* <div className="review-avatar" style={{backgroundImage:`url(${item.avatar}`}}></div> */}
        <div className="single-review-content">
            <div className="single-review-heading">
                <Link to={`/tests/${item.test_uuid}`}>{item.test_title.slice(0,25)}...</Link>
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
            <div className="single-review-description" dangerouslySetInnerHTML={{__html: item.description}}>
                {/* {item.description} */}
            </div>
        </div>
       </div>
      ));
    }


    // console.log(this.state.posts)

    if (!pageReady) {
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
    }
    // if (thisPost.length > 0 && truthyReviews) {
    //     return (
    //       <div className="loading-block">
    //         <ClipLoader
    //           // css={override}
    //           className="clippy"
    //           size={35}
    //           color={"#196196"}
    //           // loading={this.state.loading}
    //         />
    //       </div>
    //     );
    //   }
    else {
      return (
        <ThemeContextConsumer>
          {(context) => (
            <div
              className="public-profile-page"
              style={{
                display: "flex",
                justifyContent: "flex-start",
                height: "100%",
                width: "100%",
              }}
            >
              <div className="my-profile-content">
                <div className="profile-welcome">
                  <div>
                    <img src={this.state.reviews[0].avatar} />
                  </div>
                  <div>
                    {/* Using the first review to grab all of the clients information */}
                    {/* <Link to={`/tests/${item.test_uuid}`}>{item.test_title.slice(0,25)}...</Link> */}
                    <h1>{this.state.userData.first_name} {this.state.userData.last_name}</h1>
                    <p>{this.state.userData.title}</p>
                  </div>
                </div>
              

                <div className="reviews-wrapper">
                  {reviews.length > 0 ? (
                    <div>
                      <div className="reviews-header">
                        <h1>{this.state.userData.first_name} {this.state.userData.last_name}'s Reviews</h1>
                        {reviews.length > 1 ?   <p>User has left {this.state.numOfReviews} reviews</p> : <p>User has left {this.state.numOfReviews} review</p> }
                     
                      </div>
                      {items}
                    </div>
                  ) : (
                    <h1>There are no reviews yet. Be the first!</h1>
                  )}
                </div>
              </div>
            </div>
          )}
        </ThemeContextConsumer>
      );
    }
  }
}

export default PublicProfile;
