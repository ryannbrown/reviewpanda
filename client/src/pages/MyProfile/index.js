import React, { Component } from "react";
import "./style.css";
import ReviewControls from "../../components/ReviewControls";
import StarRatings from "react-star-ratings";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import SavedTests from "../../components/SavedTests/index"

import {
  ThemeContextConsumer,
  ThemeContextProvider,
} from "../../utils/themeContext";
var format = require("date-fns/format");

class MyProfile extends Component {
    static contextType = ThemeContextConsumer;
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      numOfReviews: null,
      thisPost: [],
      truthyReviews: false,
      reviewIsLoading: true,
      testIsLoading: true,
      pageReady: true,
    //   savedTests: []
    };
  }

  fetchMyReviews = (email) => {
    //   if (!uuid) {
    //     uuid = this.props.match.params.uuid
    //   }
    fetch(`/api/my_reviews/${email}`)
      .then((res) => res.json())
      .then((json) => {
        console.log("review", json);
        if (json == "error getting review") {
          this.setState({
            reviews: [],
      
          });
        } else {
          this.setState({
            reviews: json,
            numOfReviews: json.length
            // userHasReviewed: false,
          });
        }
      });
  };


  removeTest = (test) => {
if (test) {

    let ourContext = this.context;
    let email = ourContext.userData.email
    // console.log('clicked')
      fetch('/api/removetest', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          test_uuid: test,
          email: email,
        })
      }).then(response => {
        console.log("hey i did it")
        console.log(response)
        if (response.status == '200') {
            this.formatSavedTests(this.props.context.userData.saved)
            ourContext.fetchUserData(email)

        } else if (response.status == '400') {
          console.log("failed")
        }
      })
    } else {
      this.setState({
        loginAlert: true
      })
    }

  }

  formatSavedTests = (savedTest) => {
console.log(savedTest)

const allSaved = []

savedTest.forEach(test => {
    // function extractFirstText(str){
    //     const matches = str.match(/"(.*?)"/);
    //     console.log(matches)

    //     // return matches
    //     //   ? matches[1]
    //     //   : str;
    //   }
    //   extractFirstText(test)

    // console.log(test.match(/\(([^)]+)\)/)[1])


function extractAllText(str){
    const re = /"(.*?)"/g;
    const result = [];
    let current;
    while (current = re.exec(str)) {
      result.push(current.pop());
    }
    allSaved.push(result)
  }
  extractAllText(test)
})

console.log(allSaved)

this.setState({
    savedTests: allSaved
})


  }

  fetchUserData = (email) => {
      let ourContext = this.context;
    ourContext.fetchUserData()
  }



  componentDidMount() {
      console.log('profile did mount')
      if (this.props.email) {
          this.fetchMyReviews(this.props.email)
      }
      if (this.props.context.userData.email) {
        console.log('mounted', this.props.context.userData.saved)
          this.fetchUserData()
      }
  }

  componentDidUpdate(prevProps) {


    //Typical usage, don't forget to compare the props
    // makes sure the email isn't null by pulling and comparing props
    if (this.props.email !== prevProps.email) {
      this.fetchMyReviews(this.props.email);
      this.formatSavedTests(this.props.context.userData.saved)
    }
    // when component is remounting, this ensures that an update is made if context was changed
    if (this.props.context.userData.saved !== prevProps.context.userData.saved) {
      this.fetchMyReviews(this.props.email);
      this.formatSavedTests(this.props.context.userData.saved)
    
    }
   
  }

  render() {
    const { pageReady, reviews, numOfReviews, savedTests } = this.state;

    if (reviews) {
      // console.log(truthyReviews, reviews)
      var items = reviews.map((item, i) => (
        <div key={i} className="single-review">
          {/* <div
            className="review-avatar"
            style={{ backgroundImage: `url(${item.avatar}` }}
          ></div> */}
          <div className="single-review-content">
            <div className="single-review-heading">
              <Link to={`/tests/${item.test_uuid}`}>{item.test_title}</Link>
              <p>
                | {format(new Date(item.date_posted), "eeee, MMM i yyyy")} |
              </p>
              <StarRatings
                rating={item.rating}
                starRatedColor="#77E0D4"
                //   changeRating={this.changeRating}
                numberOfStars={5}
                name="updated-rating"
                starDimension="11px"
                starSpacing="1px"
                starEmptyColor="rgba(142,142,142, .25)"
                starHoverColor="rgba(142,142,142)"
                starRatedColor="#8E8E8E"
              />
            </div>
            <div className="single-review-description">{item.description}</div>
          </div>
          <Link to={`/tests/${item.test_uuid}`}><i class="lni lni-chevron-right my-review-chevron"></i></Link>
        </div>
      ));
    }

if (savedTests) {
    var tests = savedTests.map((item, i) => (
        <div className="single-review">
            <Link to={`/tests/${item[0]}`}><p>{item[1]}</p></Link>
            <div onClick={() => {this.removeTest({item})}}><i class="lni lni-close delete-icon"></i></div>
            <Link to={`/tests/${item[0]}`}><i class="lni lni-chevron-right my-review-chevron"></i></Link>
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
              className="profile-page"
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
                    <img src={context.userData.avatar} />
                  </div>
                  <div>
                    <h1>Welcome Back, {context.userData.first_name}</h1>
                    <p>You've submitted {numOfReviews} reviews, great work!</p>
                  </div>
                </div>
                <div className="saved-tests">
              <h1>Saved Tests</h1>
{tests}

{/* <SavedTests></SavedTests> */}
</div>


                <div className="reviews-wrapper">
                  {reviews.length > 0 ? (
                    <div>
                      <div className="reviews-header">
                        <h1>My Reviews</h1>
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

export default MyProfile;
