// import { Container, Nav, Button, Image, Row, Col } from 'react-bootstrap'
// import Navbar from 'react-bootstrap/Navbar'
import React, { Component } from 'react';
import './style.css';
import Navbar from "../../components/Nav"
import MostPopular from "../../components/MostPopular/index"
import RecentlyReviewed from "../../components/RecentlyReviewed/index"
import {Link} from "react-router-dom"
import DropdownSearch from "../../components/DropdownSearch/index"
import heroImg from "../../media/hero-img.jpg"

export default class Homepage extends Component {

    constructor(props) {
        super(props);

        this.listener = null;
        this.state = {
            cats: []
        };
    }

    getCats = () => {
            fetch(`/api/cats`)
              .then((res) => res.json())
              .then((json) => {
                // console.log(json);
                if (json.length > 0) {
                  // console.log("we have length")
                  this.setState({
                    cats: json,
                    isLoading: false,
                    truthyCats: true,
                    // userHasReviewed: false,
                  });
                } else {
                  // console.log("we have else")
                  this.setState({
                    cats: [],
                    truthyReviews: false,
                    isLoading: false,
                    truthyCats: false,
                  });
                }
              });
    }

    componentDidMount() {
        this.getCats()
    }



    render() {

        const {truthyCats, cats} = this.state;

        if (truthyCats) {
            // console.log(truthyReviews, reviews)
            var items = cats.map((item, i) => (
                <Link to={`/categories/${item.panda_cat}`}>
                {item.panda_cat}
                  </Link>
          
            ));
          }

        return (
            <div className="homepage-content" style={{
            }}>
                {/* <Navbar></Navbar> */}
               <div className="search-block" style={{ backgroundImage:`url('${heroImg}')`, height:'50vh', width: '100%'}}>
                 <div className="hero-left">
                 <div className="search-block-content" >
                 <h1>Find your next test here.</h1>
                <DropdownSearch></DropdownSearch>
                 </div>
                 </div>
                 <div className="hero-right" style={{}}>
                 </div>
               
                 {/* <div className="search-block-img" style={{backgroundColor:'grey'}}></div> */}
               </div>
               <div style={{display:'flex', height:'50vh', width: '100%'}}>
                   <div className="category-block">
                       <h1>Browse By Category</h1>
                       <div className="cat-wrapper">
                        {items}
                       </div>
                   </div>
               </div>
               <MostPopular></MostPopular>
               <RecentlyReviewed></RecentlyReviewed>
            </div>
        )
    }
}