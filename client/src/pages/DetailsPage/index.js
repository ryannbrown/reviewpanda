import React, { Component } from "react";
import "./style.css";
import ReviewControls from "../../components/ReviewControls";
import ClipLoader from "react-spinners/ClipLoader";
import {Link} from "react-router-dom"
import ReviewComponent from "../../components/ReviewComponent"

import {
  ThemeContextConsumer,
  ThemeContextProvider,
} from "../../utils/themeContext";

class DetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      thisPost:[],
      truthyReviews: false,
      reviewIsLoading:true,
      testIsLoading:true,
      pageReady: true
    };
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
          testIsLoading:false
        });
        this.fetchReviews(json.uuid);
      });
  
  }


  componentDidMount() {
    this.fetchPosts();
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
              className="details-page"
              style={{ display: "flex", height: "100%", width: "100%" }}
            >
              <div className="details-hero">
              <i class="lni lni-heart hero-heart"></i>
              <h1>{thisPost.title}</h1>
              {thisPost.abbrev && <h2>{thisPost.abbrev}</h2>}
              <div className="hero-sub-info">
              <p>Rating: ⭐⭐⭐⭐⭐ |</p>
              <p>Author: {thisPost.author} |</p>
            
              </div>
              <a target ="_blank" href={thisPost.link}><button className="login-btn btn">Learn More</button></a>
              </div>
                <Link to={`/categories/${thisPost.category}`} className=" back-link">Back</Link>
              <div className="details-content">
                <div className="split-left">
                  {thisPost.description && <div> <h2>Test Description</h2>
                <p>{thisPost.description}</p> </div> }
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
