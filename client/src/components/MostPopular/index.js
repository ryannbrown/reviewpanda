import React, { Component } from "react";
import {Link} from "react-router-dom"
import ClipLoader from "react-spinners/ClipLoader";

class MostPopular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      isLoading: true
    };
  }

  usePlaceholderImg(ev) {
    ev.target.src =
      "https://upload.wikimedia.org/wikipedia/commons/1/15/No_image_available_600_x_450.svg";
    console.log(ev);
  }

  fetchPosts() {
    fetch(`/api/tests`)
      .then((res) => res.json())
      .then((json) => {
        console.log("json", json);
        this.setState({
          posts: json,
          isLoading: false
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
           <Link to={`/tests/${item.uuid}`}>
          <div
            className="pop-item"
          >
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
          style={{ display: "flex", height: "50vh", width: "100%" }}
        >
          <div>
          <h1 style={{textAlign:'left'}}>Most Popular</h1>
          </div>
          {!isLoading ?       <div className="pop-wrapper">{items}</div> :
          <div>
             <ClipLoader
            // css={override}
            className="clippy"
            size={35}
            color={"#196196"}
            // loading={this.state.loading}
          />
          </div> }
    
        </div>
      );
  

 
  }
}
export default MostPopular;
