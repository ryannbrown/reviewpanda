import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav/index'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import { ThemeContextConsumer, ThemeContextProvider } from "./utils/themeContext";
import ScrollToTop from "./utils/scrollToTop.js"
// import Page from "./pages/Homepage/index"
import Homepage from "./pages/Homepage/index"
import DetailsPage from "./pages/DetailsPage/index"
import ListingPage from "./pages/ListingPage/index"
import createHistory from 'history/createBrowserHistory';
import Scraper from './pages/tools/pearsonscrape/index';
import CategorySrp from './pages/CategorySrp';
import MyProfile from './pages/MyProfile/index';
import PublicProfile from './pages/PublicProfile/index'
import SupportPage from "./pages/SupportPage/index"
import LinkedInPopUp from 'react-linkedin-login-oauth2';
import LinkedInPage from './components/LinkedIn/index';


class App extends Component {
  static contextType = ThemeContextConsumer;
  constructor(props) {
    super(props)
    this.state = {
    };
    // this.handler = this.handler.bind(this);
  }
  // const history = createHistory({
  //   basename: process.env.PUBLIC_URL,
  // });

  render () {

  return (
    <div className="App">
        <ThemeContextConsumer>
         {context => (
         <Router>
           <Nav></Nav>
           <ScrollToTop/>
           <Switch>
             {/* <Route path="/" component={Page}/> */}
             {/* <Route exact path="/profile/:uuid" render={(props) => <CategorySrp {...props}  />} /> */}
             {/* <Route path="/myprofile" component={MyProfile}/> */}
             <Route exact path="/profile/:uuid" render={(props) => <PublicProfile {...props}  />} />
             <Route exact path="/myprofile" render={(props) => <MyProfile {...props} context={context} email={context.userData.email}  />} />
             <Route exact path="/categories/:cat" render={(props) => <CategorySrp {...props}  />} />
             <Route path="/categories" component={ListingPage}/>
             <Route path="/linkedin" component={LinkedInPopUp}/>
             {/* <Route path="/linkedinpage" component={LinkedInPage}/> */}
             <Route path="/support" component={SupportPage}/>
             <Route path="/scrape" component={Scraper}/>
             <Route exact path="/tests/:uuid" render={(props) => <DetailsPage {...props}  />} />
             <Route path="/" component={Homepage}/>
           </Switch>
         </Router>
           )}
           </ThemeContextConsumer>
    </div>
  
  );
}
}

export default App;
