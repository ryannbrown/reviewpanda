import React, { Component } from "react";
import {Link} from "react-router-dom"
import {
    ThemeContextConsumer,
    ThemeContextProvider,
  } from "../../utils/themeContext";
import './style.css'

class ReviewBlock extends Component {
    static contextType = ThemeContextConsumer;
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      truthyReviews: false
    };
    this.rating = React.createRef();
    this.description = React.createRef();
  }

  fetchReviews = () => {
    fetch(`/api/review/${this.props.id}`)
      .then((res) => res.json())
      .then((json) => {
        console.log("json", json);
        this.setState({
          reviews: json,
          truthyReviews: true
        });
      });
  }

  submitReview = (e) => {
      let ourContext = this.context
      e.preventDefault()
      let id = this.props.id;
    let rating = this.rating.current.value;
    let description = this.description.current.value;
    let email = ourContext.userData.email;
    console.log(rating, description)
      console.log('submit')


      fetch("/api/postreview", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        email: ourContext.userData.email,
         id: id,
         rating: rating,
         description: description
        }),
      }).then((response) => {
        this.fetchReviews();
        // console.log("hey i did it")
        console.log(response)
        if (response.status == "200") {
            console.log("success")
            this.fetchReviews();
          // alert("success")
        } else if (response.status == "400") {
         alert('there was an error')
        }
      });
  }

  componentDidMount() {
    this.fetchReviews();
  }

  componentDidUpdate() {
      console.log(this.state)
  }

  render() {
    // console.log(this.state.reviews)
    const { isLoading, reviews, truthyReviews } = this.state;

    console.log("reviews", reviews)

    if (truthyReviews) {
        console.log("we have something!")
        console.log(this.state.reviews)
      var items = this.state.reviews.map((item, i) => (
        <div key={i}className="single-review">
          <p>{item.email}: {item.rating}: {item.description}</p>
        </div>
      ));
    } 

    return (
      <div className="reviews-comp">
          <h1> Reviews
          </h1>
            <form onSubmit={this.submitReview}>
                <input ref={this.rating} placeholder="rating 1-5"type="number"></input>
                <textarea ref={this.description} placeholder="write description for package"></textarea>
                <button type="submit">Submit Review</button>
            </form>
          <div className="reviews-wrapper">
            {items}
          </div>
      </div>
    );
  }
}
export default ReviewBlock;
