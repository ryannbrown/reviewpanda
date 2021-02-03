import React, { Component } from "react";
import "./style.css";
import ReviewControls from "../../components/ReviewControls";
import ClipLoader from "react-spinners/ClipLoader";
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
      isLoading:false
    };
  }


  fetchReviews = () => {
    fetch(`/api/review/${this.props.match.params.id}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.length > 0) {
        this.setState({
          reviews: json,
          truthyReviews: true,
          isLoading:false
          // userHasReviewed: false,
        });
      } else {
        this.setState({
          reviews: [],
          truthyReviews: false,
          isLoading:false
        })
      }
      });
  };

  fetchPosts() {
    let id = this.props.match.params.id;
    fetch(`http://localhost:3004/posts/${id}`)
      .then((res) => res.json())
      .then((json) => {
        console.log("json", json);
        this.setState({
          thisPost: json,
        });
      });
  }


  componentDidMount() {
    this.fetchReviews();
    this.fetchPosts();
  }

  render() {
    const { isLoading, thisPost, reviews, truthyReviews } = this.state;


    if (truthyReviews) {
      console.log(truthyReviews, reviews)
      var items = reviews.map((item, i) => (
        <div key={i} className="single-review">
          <p>
            {item.email}: {item.rating}: {item.description}
          </p>
        </div>
      ));
    }

    // console.log(this.state.posts)

    if (thisPost) {
      return (
        <ThemeContextConsumer>
          {(context) => (
            <div
              className="details-page"
              style={{ display: "flex", height: "100%", width: "100%" }}
            >
              <div className="details-hero">
              <h1>{thisPost.title}</h1>
              <div className="hero-sub-info">
              <p>Rating: ⭐⭐⭐⭐⭐ |</p>
              <p>Author: {thisPost.author} |</p>
              <p>Age Range: {thisPost["age range"]}</p>
              </div>
              </div>
              <div className="details-content">
                <div className="split-left">
                <h2>Test Description</h2>
                <p>{thisPost.description}</p>
                  {/* <div
                    className="pop-item"
                    style={{
                      backgroundColor: "#123047",
                      opacity: ".1",
                      margin: "5px",
                    }}
                  /> */}
                    <p>Qualification Level: {thisPost["qual-level"]}</p>
                  <p>Completion Time: {thisPost["completion time"]}</p>
                </div>
                <div className="split-right">
                  {/* <p>Title: {thisPost.title}</p> */}
               
               
                  <h2>Scores Intepretation</h2>
                  <p> {thisPost.scores_interpretation}</p>
                  <h2>Forms</h2>
                  <p>{thisPost.forms}</p>
                  <p>Publication Date: {thisPost["pub-date"]}</p>
                
                </div>
              </div>
              {/* <div className="pop-wrapper">{items}</div> */}
              {context.userData.email && (
                <ReviewControls
                fetchReviews={this.fetchReviews}
                  currentUser={context.userData.email}
                  id={this.props.match.params.id}
                ></ReviewControls>
              )}
              {/* REVIEWS COMPONENT */}
              <div className="reviews-wrapper">
          {reviews.length > 0 ? (
            <div><h1>Reviews</h1>{items}</div>
          ) : (
            <h1>There are no reviews yet. Be the first!</h1>
          )}
        </div>
            </div>
          )}
        </ThemeContextConsumer>
      );
    } else {
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
  }
}

export default DetailsPage;
