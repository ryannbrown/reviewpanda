import React, { Component } from "react";
import "./style.css";
import ReviewControls from "../../components/ReviewControls";
import StarRatings from "react-star-ratings";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import SavedTests from "../../components/SavedTests/index";
import uniq from 'lodash/uniq';
import _ from 'lodash'
import CropperTool from "../../components/CropperTool"
import {
  ThemeContextConsumer,
  ThemeContextProvider,
} from "../../utils/themeContext";
var format = require("date-fns/format");

class MyProfile extends Component {
  static contextType = ThemeContextConsumer;
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      numOfReviews: null,
      thisPost: [],
      truthyReviews: false,
      reviewIsLoading: true,
      testIsLoading: true,
      pageReady: true,
     showCropModal:false
      //   savedTests: []
    };

      // this.fileChanged = this.fileChanged.bind(this);
      // this.img = React.createRef();
  }

  fetchMyReviews = (email) => {
    //   if (!uuid) {
    //     uuid = this.props.match.params.uuid
    //   }
    fetch(`/api/my_reviews/${email}`)
      .then((res) => res.json())
      .then((json) => {
        console.log("review", json);
        if (json == "error getting review") {
          this.setState({
            reviews: [],
          });
        } else {
          this.setState({
            reviews: json,
            numOfReviews: json.length,
            // userHasReviewed: false,
          });
        }
      });
  };

  removeTest = (test) => {
    if (test) {
      let ourContext = this.context;
      let email = ourContext.userData.email;
      // console.log('clicked')
      fetch("/api/removetest", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          test_uuid: test,
          email: email,
        }),
      }).then((response) => {
        console.log("hey i did it");
        console.log(response);
        if (response.status == "200") {
          this.formatSavedTests(this.props.context.userData.saved);
          ourContext.fetchUserData(email);
        } else if (response.status == "400") {
          console.log("failed");
        }
      });
    } else {
      this.setState({
        loginAlert: true,
      });
    }
  };

  formatSavedTests = (savedTest) => {



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

      

      this.setState({
        savedTests: allSaved,
      });
    }
  };

  fetchUserData = (email) => {
    let ourContext = this.context;
    ourContext.fetchUserData();
  };


//   fileChanged(event) {
//     console.log(event)
//     var f = event.target.files;
//     console.log(f)
//     this.setState({
//         file: f
//     }, function () { console.log(this.state) });
//     // console.log("state",this.state.file)

//     // this.handleImage()
// }

  uploadAvatar = () => {

    // let img = this.img.current.value

   const filename = this.state.file[0].name
        console.log(this.state.file)

        const thisFormData = new FormData();
        thisFormData.append('element1', this.state.file[0]);
        var requestOptions = {
            method: 'POST',
            body: thisFormData,
            redirect: 'follow'
        };

        fetch("/api/upload/", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        const postItem = () => {
          // console.log("posting to DB")
          // POST TO DB
          fetch('/api/addPost', {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  image: filename
              })
          }).then(response => {
              // console.log("hey i did it")
              // console.log(response)
              if (response.status == '200') {
                  this.setState({
                      itemPosted: true
                  })
              }
          })

      }
      postItem()


  }

  toggleCropModal = () => {
    this.setState({
      showCropModal: !this.state.showCropModal
    })
  }

  componentDidMount() {

    if (this.props.email) {
      this.fetchMyReviews(this.props.email);
    }
    if (this.props.context.userData.email) {
    
      this.fetchUserData();
    }

   
  }

  componentDidUpdate(prevProps) {
    //Typical usage, don't forget to compare the props
    // makes sure the email isn't null by pulling and comparing props
    if (this.props.email !== prevProps.email) {
      this.fetchMyReviews(this.props.email);
      this.formatSavedTests(this.props.context.userData.saved);
    }
    // when component is remounting, this ensures that an update is made if context was changed
    if (
      this.props.context.userData.saved !== prevProps.context.userData.saved
    ) {
      this.fetchMyReviews(this.props.email);
      this.formatSavedTests(this.props.context.userData.saved);
    }
// this should work but current it requires a refresh for new avatar to be seen
    // if (this.props.context.userData !== prevProps.context.userData) {
    //   this.fetchUserData();
    // }
  }

  render() {
    const { pageReady, reviews, numOfReviews, savedTests } = this.state;

    if (reviews) {
      // console.log(truthyReviews, reviews)
      var items = reviews.map((item, i) => (
        <Link to={`/tests/${item.test_uuid}`}>
        <div key={i} className="single-review">
          {/* <div
            className="review-avatar"
            style={{ backgroundImage: `url(${item.avatar}` }}
          ></div> */}
          <div className="single-review-content">
            <div className="single-review-heading">
              <Link to={`/tests/${item.test_uuid}`}>{item.test_title}</Link>
              <p>|</p>
              <p>
               {format(new Date(item.date_posted), "eeee, MMM d yyyy")}
              </p>
              <p>|</p>
              <StarRatings
                rating={item.rating}
                starRatedColor="#77E0D4"
                //   changeRating={this.changeRating}
                numberOfStars={5}
                name="updated-rating"
                starDimension="11px"
                starSpacing="1px"
                starEmptyColor="rgba(142,142,142, .25)"
                starHoverColor="rgba(142,142,142)"
                starRatedColor="#8E8E8E"
              />
            </div>
            <div className="single-review-description" dangerouslySetInnerHTML={{__html:item.description }}></div>
          </div>
          <Link to={`/tests/${item.test_uuid}`}>
            <i className="lni lni-chevron-right my-review-chevron"></i>
          </Link>
        </div>
        </Link>
      ));
    }

    if (savedTests) {
      var tests = savedTests.map((item, i) => (
        <Link to={`/tests/${item[0]}`}>
        <div className="single-review">
         
            <p>{item[1]}</p>
         
          <div
            onClick={() => {
              this.removeTest({ item });
            }}
          >
            <i className="lni lni-close delete-icon"></i>
          </div>
          <Link to={`/tests/${item[0]}`}>
            <i className="lni lni-chevron-right my-review-chevron"></i>
          </Link>
        </div>
        </Link>
      ));
    }

    // console.log(this.state.posts)

    if (!pageReady) {
      return (
        <div className="loading-block">
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

    else {
      return (
        <ThemeContextConsumer>
          {(context) => (
            <div
              className="profile-page"
              style={{
                display: "flex",
                justifyContent: "flex-start",
                height: "100%",
                width: "100%",
              }}
            >
              <div className="my-profile-content">
                <div className="profile-welcome">
                    
                  <div>
                 
                   <div onClick={this.toggleCropModal} className="avatar-profile-page"
                    // style={{backgroundImage:`url(${context.userData.avatar})`,
                    style={{backgroundImage: context.userData.has_uploaded_img ? `url('https://reviewpanda.s3.amazonaws.com/${context.userData.avatar}')` : `url('${context.userData.avatar}')` ,
                     backgroundSize: 'cover', width: '115px', margin: '0px 25px', borderRadius: '15px', height:'153px', backgroundPosition:'center center'}}>
                     <div>
                     <i                    // onClick={this.uploadAvatar}
                       class="lni lni-upload upload-avatar-icon"></i>
                     </div>
                       {/* <label for="file-input">
                  
                         </label> */}
                         {/* <input
                         id="file-input"
                         className="upload-file"
                            onChange={this.fileChanged.bind(this)}
                            ref={this.img}
                            type="file" required placeholder="Upload File" /> */}
                       </div>
                  </div>
                  <div>
                    <h1>Welcome Back, {context.userData.first_name}</h1>
                    <p>You've submitted {numOfReviews} reviews, great work!</p>
                  </div>
                </div>
                <div className="saved-tests">
                  <h1>Saved Tests</h1>
                  {tests}

                  {/* <SavedTests></SavedTests> */}
                </div>

                <div className="reviews-wrapper">
                  {reviews.length > 0 ? (
                    <div>
                      <div className="reviews-header">
                        <h1>My Reviews</h1>
                      </div>
                      {items}
                    </div>
                  ) : (
                    <h1>There are no reviews yet. Be the first!</h1>
                  )}
                </div>
              </div>
              {this.state.showCropModal && context.userData.uuid && 
              <div className="cropper-modal-background">
                <CropperTool currentUser={context.userData.uuid} toggleCropModal={this.toggleCropModal}></CropperTool>
              </div>}
            </div>
          )}
        </ThemeContextConsumer>
      );
    }
  }
}

export default MyProfile;
