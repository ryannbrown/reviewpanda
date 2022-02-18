import React, { Component } from "react";
import {Link} from "react-router-dom"
import StarRatings from 'react-star-ratings';
import {
    ThemeContextConsumer,
    ThemeContextProvider,
  } from "../../utils/themeContext";
import './style.css'
// import exitBtn from "../../media/feather/trash.svg"
// import MyEditor from "../../components/MyEditor/index"

class FilterByAlphabet extends Component {
    static contextType = ThemeContextConsumer;
  constructor(props) {
    super(props);
    this.state = {
  
    };

  }


makeActive = () => {
console.log('this is active')
}

  componentDidMount() {
    //   console.log(this.props.myReview)
  }

  render() {
    // console.log(this.state.reviews)
    // const { myReview} = this.props;

    return (
      <div className="alpha-filter">
            <a onClick={() => {this.props.filter(this.props.cat, 'showAll')}}>All</a>
            {/* <a onClick={() => {this.props.filter(this.props.cat, '%')}}>0-9</a> */}
       <a onClick={() => {this.props.filter(this.props.cat, 'A')}}>A</a>
       <a onClick={() => {this.props.filter(this.props.cat, 'B')}} >B</a>
       <a onClick={() => {this.props.filter(this.props.cat,'C')}}>C</a>
       <a onClick={() => {this.props.filter(this.props.cat,'D')}}>D</a>
       <a onClick={() => {this.props.filter(this.props.cat,'E')}}>E</a>
       <a onClick={() => {this.props.filter(this.props.cat,'F')}}>F</a>
       <a onClick={() => {this.props.filter(this.props.cat,'G')}}>G</a>
       <a onClick={() => {this.props.filter(this.props.cat,'H')}}>H</a>
       <a onClick={() => {this.props.filter(this.props.cat,'I')}}>I</a>
       <a onClick={() => {this.props.filter(this.props.cat,'J')}}>J</a>
       <a onClick={() => {this.props.filter(this.props.cat,'K')}}>K</a>
       <a onClick={() => {this.props.filter(this.props.cat,'L')}}>L</a>
       <a onClick={() => {this.props.filter(this.props.cat,'M')}}>M</a>
       <a onClick={() => {this.props.filter(this.props.cat,'N')}}>N</a>
       <a onClick={() => {this.props.filter(this.props.cat,'O')}}>O</a>
       <a onClick={() => {this.props.filter(this.props.cat,'P')}}>P</a>
       <a onClick={() => {this.props.filter(this.props.cat,'Q')}}>Q</a>
       <a onClick={() => {this.props.filter(this.props.cat,'R')}}>R</a>
       <a onClick={() => {this.props.filter(this.props.cat,'S')}}>S</a>
       <a onClick={() => {this.props.filter(this.props.cat,'T')}}>T</a>
       <a onClick={() => {this.props.filter(this.props.cat,'U')}}>U</a>
       <a onClick={() => {this.props.filter(this.props.cat,'V')}}>V</a>
       <a onClick={() => {this.props.filter(this.props.cat,'W')}}>W</a>
       <a onClick={() => {this.props.filter(this.props.cat,'X')}}>X</a>
       <a onClick={() => {this.props.filter(this.props.cat,'Y')}}>Y</a>
       <a onClick={() => {this.props.filter(this.props.cat,'Z')}}>Z</a>

      </div>
    );
  }
}
export default FilterByAlphabet;
