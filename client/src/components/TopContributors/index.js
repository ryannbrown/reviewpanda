import React, { Component } from "react";
import {Link} from "react-router-dom"
import "./style.css";

class TopContributors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  usePlaceholderImg(ev) {
    ev.target.src ="https://upload.wikimedia.org/wikipedia/commons/1/15/No_image_available_600_x_450.svg";
    console.log(ev);
  }

  fetchPosts() {
    fetch(`/api/topcontribs`)
      .then((res) => res.json())
      .then((json) => {
        console.log("contribs", json);
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
      var items = this.state.posts.slice(0, 6).map((item, i) => (
        <div>
           <Link to={`/profile/${item.user_uuid}`}>
          <div
            className="pop-item contributors"
            // style={{backgroundImage: `url'(item.avatar}'`}}
              style={{backgroundImage: `url(${item.avatar})`}}
          
          >
            {/* <div ></div> */}
              {/* <h1>{item.test_abbrev}</h1>
             <p>{item.test_title}</p> */}
            </div>
          </Link>
          {/* <p>{item.test_title}</p> */}
        </div>
      ));
    }
    return (
      <div
        className="most-pop-block"
        style={{ display: "flex", height: "100%", minHeight:'50vh', width: "100%" }}
      >
        <h1>Top Contributors</h1>
        <div className="contrib-wrapper">{items}</div>
      </div>
    );
  }
}
export default TopContributors;
