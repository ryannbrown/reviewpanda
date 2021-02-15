import React, { Component } from "react";
import "./style.css";
import ReviewControls from "../../components/ReviewControls";
import ClipLoader from "react-spinners/ClipLoader";
import {
  ThemeContextConsumer,
  ThemeContextProvider,
} from "../../utils/themeContext";
import { Link } from "react-router-dom";
import chevRight from "../../media/grey-chev.svg"
import sunImg from "../../media/pink-sun.svg"

class CategorySrp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      thisPost: [],
      currentCat: '',
      truthyReviews: false,
      isLoading: true,
    };
  }

  fetchReviewsByCat = (cat) => {
    fetch(`/api/cats/${cat}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.length > 0) {
          // console.log("we have length")
          this.setState({
            reviews: json,
            isLoading: false,
            truthyReviews: true,
            // userHasReviewed: false,
          });
        } else {
          // console.log("we have else")
          this.setState({
            reviews: [],
            truthyReviews: false,
            isLoading: false,
            truthyCats: false,
          });
        }
      });
  };

  componentDidMount() {
    this.fetchReviewsByCat(this.props.match.params.cat);
    this.setState({
      currentCat:this.props.match.params.cat
    })
// console.log(this.props.match.params.cat);

  }
  componentDidUpdate() {
    // console.log(this.state);
  }

  render() {
    const { truthyCats, reviews, truthyReviews } = this.state;

    if (truthyReviews) {
      // console.log(truthyReviews, reviews)
      var items = reviews.map((item, i) => (
        <div key={i} className="single-test">
          <Link to={`/tests/${item.uuid}`}>
            <div className="single-test-text">
          {/* <img className="category-icon" src={sunImg}></img> */}
          <h2>{item.abbrev}</h2>
            <p>{item.title}</p>
            </div>
            <img className="chevron" src={chevRight}></img>
            </Link>
        </div>
      ));
    }

    // console.log(this.state.posts)

    if (!this.state.isLoading) {
      return (
        <ThemeContextConsumer>
          {(context) => (
            <div
              className="srp-page"
              style={{ display: "flex", height: "100%", width: "100%" }}
            >
              <div className="srp-page-content">
                <h1>{this.state.currentCat || Error}</h1>
                <div className="srp-action-btns">
                  <Link to="/categories"><button className="btn">All</button></Link>
                  <Link to="/"><button className="btn">⭐</button></Link>
                  <Link to="/"><button className="btn">Popular</button></Link>
                </div>
                <div className="srp-row-header">
                  <p>Test Name</p>
                </div>
                <div className="cats">{items}</div>
              </div>
            </div>
          )}
        </ThemeContextConsumer>
      );
    } else {
      return (
        <div className="loading-block-srp">
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

export default CategorySrp;
