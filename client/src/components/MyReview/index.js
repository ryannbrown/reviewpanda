import React, { Component } from "react";
import {Link} from "react-router-dom"
import {
    ThemeContextConsumer,
    ThemeContextProvider,
  } from "../../utils/themeContext";
import './style.css'
import exitBtn from "../../media/feather/trash.svg"

class MyReview extends Component {
    static contextType = ThemeContextConsumer;
  constructor(props) {
    super(props);
    this.state = {
      myReview: [],
      itemDeleted:false
      // truthyReviews: false
    };
    this.rating = React.createRef();
    this.description = React.createRef();
  }

  deleteMyReview = () => {
      console.log("deleting review")
      // POST TO DB
      fetch('/api/remove_review', {
          method: 'DELETE',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              review_uuid: this.props.myReview.review_uuid,
          })
      })
      .then((res) => {
        console.log(res)
      if (res.status == '200') {
   
        this.props.fetchFromDelete();
      } else {
      }
    })
  }

  componentDidMount() {
      console.log(this.props.myReview)
  }

  render() {
    // console.log(this.state.reviews)
    const { myReview} = this.props;

    return (
      <div className="reviews-comp">
           <img className="review-delete-btn" src={exitBtn} onClick={this.deleteMyReview}></img>
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
