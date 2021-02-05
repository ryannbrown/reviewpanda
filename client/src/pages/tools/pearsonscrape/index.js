import React, { Component } from "react";

class Scraper extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.url = React.createRef();
    this.cat = React.createRef();
  }


handleSubmit = (event) => {
    event.preventDefault();
    let url = this.url.current.value
    let cat = this.cat.current.value
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
            cat: cat
       
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
<input ref={this.cat} placeholder="cat" id="url" name="url"></input>
<button type="submit">scrape</button>
              </form>
              
          </div>
      )
}
}

export default Scraper;
