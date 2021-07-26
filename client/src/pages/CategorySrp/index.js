import React, { Component } from "react";
import "./style.css";
import ReviewControls from "../../components/ReviewControls";
import ClipLoader from "react-spinners/ClipLoader";
import uniq from 'lodash/uniq';
import _ from 'lodash'
import {
  ThemeContextConsumer,
  ThemeContextProvider,
} from "../../utils/themeContext";
import { Link } from "react-router-dom";
import chevRight from "../../media/grey-chev.svg"
import sunImg from "../../media/pink-sun.svg"
import LoginModal from '../../components/LoginModal'
import StarRatings from "react-star-ratings"

class CategorySrp extends Component {
  static contextType = ThemeContextConsumer;
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      thisPost: [],
      savedTests:[],
      currentCat: '',
      truthyReviews: false,
      modalOpened: false,
      isLoading: true,
      headerTitle: this.props.match.params.cat,
      overflowHidden:true
    };
  }



  formatSavedTests = (savedTest) => {

    this.setState({
      truthyReviews: false
    })

console.log(savedTest)

    let uniqueTests = _.uniq(savedTest)


    const allSaved = [];
    if (savedTest) {
     uniqueTests.forEach((test) => {
        // function extractFirstText(str){
        //     const matches = str.match(/"(.*?)"/);
        //     console.log(matches)

        //     // return matches
        //     //   ? matches[1]
        //     //   : str;
        //   }
        //   extractFirstText(test)

        // console.log(test.match(/\(([^)]+)\)/)[1])

        function extractAllText(str) {
          const re = /"(.*?)"/g;
          const result = [];
          let current;
          while ((current = re.exec(str))) {
            result.push(current.pop());
          }
          allSaved.push(result);
        }
      
        extractAllText(test);
      });
      console.log(allSaved)
      

      this.setState({
        savedTests: allSaved,
        headerTitle: 'Saved'
      });
    }
  };

  fetchReviewsByCat = (cat) => {
    this.setState({isLoading:true})
    fetch(`/api/cats/${cat}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.length > 0) {
          // console.log("we have length")
          this.setState({
            reviews: json,
            headerTitle:cat,
            isLoading: false,
            truthyReviews: true,
            // userHasReviewed: false,
          });
        } else {
          // console.log("we have else")
          this.setState({
            reviews: [],
            // headerTitle: cat,
            truthyReviews: false,
            isLoading: false,
            truthyCats: false,
          });
        }
      });
  };

  fetchPopTests = () => {
    fetch(`/api/poptests`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.length > 0) {
          // console.log("we have length")
          this.setState({
            headerTitle: 'Most Popular',
            reviews: json,
            isLoading: false,
            truthyReviews: true,
            // userHasReviewed: false,
          });
        } else {
          // console.log("we have else")
          this.setState({
            reviews: [],
            truthyReviews: false,
            isLoading: false,
            truthyCats: false,
          });
        }
      });
  };



  toggleModal = () => {
    this.fixOverflow();
    console.log("clicked");
    this.setState({
      modalOpened: !this.state.modalOpened,
    });
  };


  fixOverflow = () => {
    console.log(this.state.overflowHidden)
if (this.state.overflowHidden) {
  document.getElementsByTagName('body')[0].style.overflowY='hidden';
} else {
  document.getElementsByTagName('body')[0].style.overflowY='unset';
}
    this.setState({overflowHidden: !this.state.overflowHidden})
  }

  componentDidMount() {
console.log(this.state)

    this.fetchReviewsByCat(this.props.match.params.cat);
    this.setState({
      currentCat:this.props.match.params.cat
    })
// console.log(this.props.match.params.cat);


  }
  componentDidUpdate(prevProps) {

      //Typical usage, don't forget to compare the props
      if (this.props.match.params.cat !== prevProps.match.params.cat) {
         this.fetchReviewsByCat(this.props.match.params.cat)
      }
     


    let ourContext = this.context
    console.log(ourContext);
  }

  render() {
    const { truthyCats, reviews, truthyReviews, savedTests, headerTitle, modalOpened } = this.state;

console.log(savedTests)




    // if (headerTitle === this.state.currentCat || headerTitle ==='Most Popular') {
      if (reviews.length > 0) {
      // console.log(truthyReviews, reviews)
      var items = reviews.map((item, i) => (
        <div key={i} className="single-test">
          <Link to={`/tests/${item.uuid}`}>
            <div className="single-test-text">
          {/* <img className="category-icon" src={sunImg}></img> */}
      
         <div className="srp-test-titles">
          <h2>{item.abbrev}</h2>
            <p>{item.title}</p>
         </div>
         <div className="srp-line-item">
         {item.review_avg && item.review_avg !=='NaN' && <div className="srp-rating-block"><StarRatings
              rating={parseFloat(item.review_avg)}
              // rating={5}
              starRatedColor="#77E0D4"
              // changeRating={this.changeRating}
              numberOfStars={5}
              name='updated-rating'
              starDimension = '11px'
              starSpacing='0px'
              isAggregateRating="true"
              starEmptyColor='rgba(119,224,212, .25)'
              starHoverColor='rgba(119,224,212)'
              starRatedColor='rgba(119,224,212)'
            /> {item.review_count > 1 ? <p>{item.review_count} Reviews</p> : <p>{item.review_count} Review</p>  } </div> }
         </div>
            </div>
            <img className="chevron" src={chevRight}></img>
            </Link>
        </div>
      ));
    }

        if (headerTitle === 'Saved') {
      var items = savedTests.map((item, i) => (
    
        <div className="single-test">
        <Link to={`/tests/${item[0]}`}>
        <div className="single-test-text">
       
          <p>{item[1]}</p>
          </div>
          <img className="chevron" src={chevRight}></img>
          </Link>
        </div>
       
      ));
    }

    // console.log(this.state.posts)

    if (!this.state.isLoading) {
      return (
        <ThemeContextConsumer>
          {(context) => (
            <div
              className="srp-page"
              style={{ display: "flex", height: "100%", width: "100%" }}
            >
              <div className="srp-page-content">
                <h1>{this.state.headerTitle}</h1>
                <div className="srp-action-btns">
                  <Link to="/categories"><button className="btn">All</button></Link>
                  {context.userLoggedIn ?  <button onClick={() => {this.formatSavedTests(context.userData.saved)}} className="btn loggedin">⭐</button> :  <button onClick={this.toggleModal} className="btn notlogged">⭐</button> }
                 
                 <button onClick={this.fetchPopTests} className="btn">Popular</button>
                </div>
                <div className="srp-row-header">
                  <p>Test Name</p>
                  <p>Reviews</p>
                </div>
                {/* { ?  */}
                <div className="cats">{items}</div> 
                {/* :
                <div className="catzs">{saved}</div>
              } */}
              </div>
              {modalOpened && <LoginModal toggleModal={this.toggleModal}></LoginModal>}
            </div>
          )}
        </ThemeContextConsumer>
      );
    } else {
      return (
        <div className="loading-block-srp">
          <ClipLoader
            // css={override}
            className="clippy"
            size={35}
            color={"#196196"}
            // loading={this.state.loading}
          />
        </div>
      );
    }
  }
}

export default CategorySrp;
