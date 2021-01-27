import React, { Component } from "react";
import "./style.css";
import ReviewBlock from "../../components/ReviewBlock"

class DetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  usePlaceholderImg(ev) {
    ev.target.src =
      "https://upload.wikimedia.org/wikipedia/commons/1/15/No_image_available_600_x_450.svg";
    console.log(ev);
  }

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
    this.fetchPosts();
  }

  render() {
    // console.log(this.state.posts)
    const { isLoading, thisPost } = this.state;

    if (thisPost) {
      return (
        <div
          className="details-page"
          style={{ display: "flex", height: "100%", width: "100%" }}
        >
          <h1>{thisPost.title}</h1>
          <div className="details-content">
            <div className="split-left">
              <div
                className="pop-item"
                style={{
                  backgroundColor: "#123047",
                  opacity: ".1",
                  margin: "5px",
                }}
              />
            </div>
            <div className="split-right">
              <p>Title: {thisPost.title}</p>
              <p>Author: {thisPost.author}</p>
              <p>Description: {thisPost.description}</p>
              <p>Forms: {thisPost.forms}</p>
              <p>Scores/Intepretation: {thisPost.scores_interpretation}</p>
              <p>Age Range: {thisPost["age range"]}</p>
              <p>Publication Date: {thisPost["pub-date"]}</p>
              <p>Qualification Level: {thisPost["qual-level"]}</p>
              <p>Completion Time: {thisPost["completion time"]}</p>
            </div>
          </div>
          {/* <div className="pop-wrapper">{items}</div> */}
          <ReviewBlock id={this.props.match.params.id}></ReviewBlock>
        </div>
      );
    }
     else {
      return <div>loading</div>;
    }
  }
}

export default DetailsPage;
