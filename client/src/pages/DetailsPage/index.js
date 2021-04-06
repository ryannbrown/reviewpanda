import React, { Component } from "react";
import "./style.css";
import ReviewControls from "../../components/ReviewControls";
import ClipLoader from "react-spinners/ClipLoader";
import {Link} from "react-router-dom"
import ReviewComponent from "../../components/ReviewComponent"
import StarRatings from 'react-star-ratings';

import {
  ThemeContextConsumer,
  ThemeContextProvider,
} from "../../utils/themeContext";

class DetailsPage extends Component {
  static contextType = ThemeContextConsumer;
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      thisPost:[],
      truthyReviews: false,
      reviewIsLoading:true,
      testIsLoading:true,
      pageReady: false,
      isTestSaved: false,
      attempt: 0,
      reviewAvg: null,
      totalStars: null
    };
  }


  saveTest = (test) => {
console.log(test)
    // console.log('clicked')
    const ourContext = this.context;
    console.log(ourContext);
let email = ourContext.userData.email
    if (email) {
      fetch('/api/savetest', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          test_uuid: this.props.match.params.uuid,
          email: email,
          title: test

        })
      }).then(response => {
        console.log("hey i did it")
        console.log(response)
        if (response.status == '200') {
          this.setState({
            isTestSaved: true
          })

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

  getReviewRatings = (reviews) => {

    if (reviews.length > 0) {

  
    console.log(reviews)
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
    //  console.log(total)
     // console.log(total, sum.length)
     var numReviews = sum.length;
     var avg = total / sum.length;
     var theAvg = (Math.round(avg * 100) / 100)
    //  .toFixed(2);
     console.log(theAvg)
     this.setState({
       reviewAvg: theAvg,
       totalStars: total
     })
     //  console.log(avg)
  }
}

setReviewCount = (number) => {
console.log(number)
this.setState({reviewCount:number})
}



  fetchReviews = (uuid) => {
    console.log(uuid)
  if (!uuid) {
    uuid = this.props.match.params.uuid
  }
    fetch(`/api/review/${uuid}`)
      .then((res) => res.json())
      .then((json) => {
        console.log("review", json)
        if (json == 'error getting review') {
          this.setState({
            reviews: [],
            truthyReviews: false,
            reviewIsLoading:false
          })
       
      } else {
        this.setState({
          reviews: json,
          truthyReviews: true,
          isLoading:false
          // userHasReviewed: false,
        });
        this.getReviewRatings(json)
        this.setReviewCount(json.length)
      }
      });
     
  };

  fetchPosts() {
    let uuid = this.props.match.params.uuid;
    fetch(`/api/tests/${uuid}`)
      .then((res) => res.json())
      .then((json) => {
        console.log("json", json);
        this.setState({
          thisPost: json,
          testIsLoading:false,
          pageReady:true
        });
        this.fetchReviews(json.uuid);
      });
  
  }

  checkIfTestIsSaved = (savedTests, thisPost) => {
    console.log(this.state.testSaved)
   let currentTest = thisPost
   console.log(savedTests)
   console.log(currentTest)
    let saved = JSON.stringify(savedTests)
      if (saved.includes(currentTest)){
        console.log("it includes it")
        this.setState({
          isTestSaved: true,
          attempt: this.state.attempt + 1
        })
      }
  }


  componentDidMount() {
    this.fetchPosts();


    // console.log(ourContext)

  
  }


  componentDidUpdate(prevState) {
console.log(this.state);


    let ourContext = this.context;
    // make sure to not have continuous loop when checking if this current test has been saved by a user
    // for some reason my original conditional wasn't working so I incremeneted 'attempt' to ensure there was no loop.
    if (this.state.thisPost !== prevState.thisPost && ourContext.userData.saved && this.state.attempt <= 1) {
        this.checkIfTestIsSaved(this.context.userData.saved, this.state.thisPost.uuid)
    }
  }

  render() {
    const {reviewIsLoading, testIsLoading, thisPost, reviews, truthyReviews, pageReady } = this.state;


 

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

   else {
      return (
        <ThemeContextConsumer>
          {(context) => (
            <div
              className="details-page"
              style={{ display: "flex", height: "100%", width: "100%" }}
            >
               <div>
                <Link to={`/categories/${thisPost.panda_cat}`} className="back-link"><i style={{margin:'0px 5px'}} class="lni lni-chevron-left"></i> Explore all from {thisPost.panda_cat}</Link>
              </div>
              <div className="details-hero">
{!this.state.isTestSaved ?   <i onClick={() => {this.saveTest(thisPost.title)}} class="lni lni-heart hero-heart"></i> :  <i class="lni lni-checkmark-circle hero-heart"></i> }
            
             
              <h1>{thisPost.title}</h1>
          
              <div className="hero-sub-info">
                {/* {this.state.reviewAvg !== 'NaN' ? 
              <p>Rating: {this.state.reviewAvg} | </p> :
              <p>Rating: Be the first! | </p>
                } */}
                {this.state.reviewAvg !== null ? 
                <p>Rating: 
                <StarRatings
                rating={this.state.reviewAvg}
                starRatedColor="#77E0D4"
              //   changeRating={this.changeRating}
                numberOfStars={5}
                name='updated-rating'
                starDimension = '11px'
                starSpacing='0px'
                isAggregateRating="true"
                starEmptyColor='rgba(255,255,255, .25)'
                starHoverColor='rgba(255,255,255)'
                starRatedColor='rgba(255,255,255)'
              /> </p>: <p> Rating: NA </p>
                }
                {thisPost.abbrev && <p className="desktop-hash">|</p>}
                {/* |</p> */}
              {/* <p>Rating:  
                <StarRatings
              rating={this.state.reviewAvg}
              starRatedColor="#77E0D4"
            //   changeRating={this.changeRating}
              numberOfStars={5}
              name='updated-rating'
              starDimension = '11px'
              starSpacing='1px'
              starEmptyColor='rgba(142,142,142, .25)'
              starHoverColor='rgba(142,142,142)'
              starRatedColor='#8E8E8E'
            /> |</p> */}
                {thisPost.abbrev && <p> {thisPost.abbrev} </p>}
                {thisPost.qual_level && <p className="desktop-hash">|</p>}
              <p> Level Required: {thisPost.qual_level} </p>
            
              </div>
              <a target ="_blank" href={thisPost.link}><button className="transparent-btn btn">Learn More</button></a>
              </div>
              <div className="details-content">
                <div className="split-left">
                  {thisPost.description && <div> <h2>Test Description</h2>
                <p>{thisPost.description}</p> </div> }
                <p>Author(s): {thisPost.author} </p>
                {thisPost.scores_interpretation &&  <div> <h2>Scores Intepretation</h2> <p> {thisPost.scores_interpretation}</p> </div>}
                      <div className="spec-icons">

                      {thisPost.age_range &&  <p><i class="lni lni-user"></i> {thisPost.age_range}</p> }
                        {thisPost.comp_time  && <p><i class="lni lni-alarm-clock"></i> {thisPost.comp_time}</p> }
                        {/* TODO: add conditional */}
                      {thisPost.description && <p><i class="lni lni-bubble"></i> {reviews.length} Reviews</p> }
                      {thisPost.comp_time  && <p><i class="lni lni-bar-chart"></i> {thisPost.qual_level}</p> }
                      </div>
                
                </div>
                <div className="split-right">
                
                  {thisPost.forms && <div> <h2>Forms</h2><p>{thisPost.forms}</p> </div>}

                  {thisPost.pub_date  && <p>Publication Date: {thisPost.pub_date}</p> }

                     { pageReady && (
                <ReviewControls
                totalStars={this.state.totalStars}
                reviewCount={this.state.reviewCount}
                loginAlert={this.state.loginAlert}
              // TODO make saveTest the name of the saveTest variable in state
                testSaved={this.state.isTestSaved}
                saveTest={this.saveTest}
                thisTest={thisPost}
                test_uuid= {this.props.match.params.uuid}
                fetchReviews={this.fetchReviews}
                  currentUser={context.userData.email}
                  // id={this.props.match.params.id}
                ></ReviewControls>
              )}
                </div>
              </div>
                <ReviewComponent
                //  isLoading={isLoading} 
                 reviews={reviews}></ReviewComponent>
  
            </div>
          )}
        </ThemeContextConsumer>
      );
    }
  }
}

export default DetailsPage;
