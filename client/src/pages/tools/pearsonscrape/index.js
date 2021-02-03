import React, { Component } from "react";

class Scraper extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.url = React.createRef();
  }


handleSubmit = (event) => {
    event.preventDefault();
    let url = this.url.current.value
    fetch('/api/scrape', {
        method: 'POST',
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // first_name: first_name,
            // last_name: last_name,
            url: url,
       
          }),
      });

}

  componentDidMount() {
  console.log("scraper mounted")
  }

  render() {

    // console.log(this.state.posts)


      return (
          <div>
              <h1>Pearson Scraper</h1>
              <form onSubmit={this.handleSubmit}>
<input ref={this.url} placeholder="url goes here" id="url" name="url"></input>
<button type="submit">scrape</button>
              </form>
              
          </div>
      )
}
}

export default Scraper;
