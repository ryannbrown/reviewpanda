import React, { Component } from "react";
import {Link} from "react-router-dom"
import ClipLoader from "react-spinners/ClipLoader";
import StarRatings from "react-star-ratings"
class MostPopular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      isLoading: true,
      isEmpty: false
    };
  }

  usePlaceholderImg(ev) {
    ev.target.src =
      "https://upload.wikimedia.org/wikipedia/commons/1/15/No_image_available_600_x_450.svg";
    console.log(ev);
  }

  fetchPosts() {
    fetch(`/api/poptests`)
      .then((res) => res.json())
      .then((json) => {
        console.log("pop tests", json);
        if (json.length > 0) {
          this.setState({
            posts: json,
            isLoading: false
          });
        } else {
            this.setState({
              isEmpty: true,
              isLoading:false
            })
        }
      });
  }

  componentDidMount() {
    this.fetchPosts();
  }

  render() {
    // console.log(this.state.posts)
    const { isLoading, isEmpty } = this.state;

    if (this.state.posts.length > 0) {
      var items = this.state.posts.slice(0, 6).map((item, i) => (
        <div>
           <Link to={`/tests/${item.uuid}`}>
          <div
            className="pop-item"
          >
            {/* <p className="pop-count">Reviews: {item.review_count}</p> */}
            <StarRatings
              rating={parseFloat(item.review_avg)}
              starRatedColor="#77E0D4"
              // changeRating={this.changeRating}
              numberOfStars={5}
              name='updated-rating'
              starDimension = '11px'
              starSpacing='0px'
              isAggregateRating="true"
              starEmptyColor='rgba(255,255,255, .25)'
              starHoverColor='rgba(255,255,255)'
              starRatedColor='rgba(255,255,255)'
            />
             <h1>{item.abbrev}</h1>
             <p>{item.title}</p>
          </div>
          </Link>
        </div>
      ));
    } 
      return (
        <div
          className="most-pop-block"
          style={{ display: "flex", height: "100%", width: "100%" }}
        >
          <div>
          <h1 style={{textAlign:'left'}}>Most Popular</h1>
          </div>
          {!isLoading ?       <div className="pop-wrapper">{items}</div> :
          <div className="pop-loading">
             <ClipLoader
            // css={override}
            className="clippy"
            size={35}
            color={"#196196"}
            // loading={this.state.loading}
          />
          </div> }
          {isEmpty &&  <p>No tests have been reviewed yet. Be the first!</p>}
    
        </div>
      );
  

 
  }
}
export default MostPopular;
