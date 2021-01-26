import React, { Component } from "react";

class MostPopular extends Component {
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
    fetch(`http://localhost:3004/posts?&_limit=4`)
      .then((res) => res.json())
      .then((json) => {
        console.log("json", json);
        this.setState({
          posts: json,
        });
      });
  }

  componentDidMount() {
    this.fetchPosts();
  }

  render() {
    // console.log(this.state.posts)
    const { isLoading } = this.state;

    if (this.state.posts.length > 0) {
      var items = this.state.posts.map((item, i) => (
        <div>
            {/* <Link></Link> */}
          <div
            className="pop-item"
            style={{ backgroundColor: "#123047", opacity: ".1", margin: "5px" }}
          />
          <p>{item.title}</p>
        </div>
      ));
    }
    return (
      <div
        className="most-pop-block"
        style={{ display: "flex", height: "50vh", width: "100%" }}
      >
        <h1>Most Popular</h1>
        <div className="pop-wrapper">{items}</div>
      </div>
    );
  }
}
export default MostPopular;
