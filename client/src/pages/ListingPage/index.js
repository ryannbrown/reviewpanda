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

class ListingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      thisPost: [],
      truthyReviews: false,
      isLoading: true,
    };
  }

  fetchCats = () => {
    fetch(`/api/cats`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.length > 0) {
          // console.log("we have length")
          this.setState({
            cats: json,
            isLoading: false,
            truthyCats: true,
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
    this.fetchCats();
  }
  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    const { cats, truthyCats } = this.state;

    if (truthyCats) {
      // console.log(truthyReviews, reviews)
      var items = cats.map((item, i) => (
        <div key={i} className="single-cat">
          <Link to={`/categories/${item.category}`}>
            <div style={{display:'flex'}}>
          <img className="category-icon" src={sunImg}></img>
            <p>{item.category}</p>
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
              className="listing-page"
              style={{ display: "flex", height: "100%", width: "100%" }}
            >
              <div className="listing-page-content">
                <h1>Categories</h1>
                <div className="cats">{items}</div>
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

export default ListingPage;
