// import { Container, Nav, Button, Image, Row, Col } from 'react-bootstrap'
// import Navbar from 'react-bootstrap/Navbar'
import React, { Component } from 'react';
import './style.css';
import Navbar from "../../components/Nav"

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
               <div>Hello World!</div>
            </div>
        )
    }
}