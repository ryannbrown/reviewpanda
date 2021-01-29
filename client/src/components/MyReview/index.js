import React, { Component } from "react";
import {Link} from "react-router-dom"
import {
    ThemeContextConsumer,
    ThemeContextProvider,
  } from "../../utils/themeContext";
import './style.css'

class MyReview extends Component {
    static contextType = ThemeContextConsumer;
  constructor(props) {
    super(props);
    this.state = {
      myReview: [],
      // truthyReviews: false
    };
    this.rating = React.createRef();
    this.description = React.createRef();
  }

  componentDidUpdate() {
    //   console.log(this.state)
  }

  componentDidMount() {
      console.log(this.props.myReview)
  }

  render() {
    // console.log(this.state.reviews)
    const { myReview} = this.props;

    return (
      <div className="reviews-comp">
          <h1> My Review
          </h1>
          <div>
              <h3>Rating: {myReview.rating}</h3>
              <h3>Description: {myReview.description}</h3>
          </div>
      </div>
    );
  }
}
export default MyReview;
