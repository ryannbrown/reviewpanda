// import { Container, Nav, Button, Image, Row, Col } from 'react-bootstrap'
// import Navbar from 'react-bootstrap/Navbar'
import React, { Component } from 'react';
import './style.css';
import Navbar from "../../components/Nav"
import MostPopular from "../../components/MostPopular/index"

export default class Homepage extends Component {

    constructor(props) {
        super(props);

        this.listener = null;
        this.state = {
        };
    }

    componentDidMount() {
    }



    render() {
        return (
            <div className="homepage-content" style={{
            }}>
                {/* <Navbar></Navbar> */}
               <div className="search-block" style={{backgroundColor:'grey', height:'50vh', width: '100%'}}></div>
               <div style={{display:'flex', height:'50vh', width: '100%'}}>
                   <div className="category-block">
                       <h1>Browse By Category</h1>
                       <div className="cat-wrapper">
                           <div>All Tests</div>
                           <div>Academic</div>
                           <div>Development</div>
                           <div>Cognitive</div>
                           <div>Social | Emotional</div>
                           <div>Interventions</div>
                           <div>Occupational | Physical</div>
                           <div>Speech | Language</div>
                       </div>
                   </div>
               </div>
               <MostPopular></MostPopular>
            </div>
        )
    }
}