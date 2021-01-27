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

// import Page from "./pages/Homepage/index"
import Homepage from "./pages/Homepage/index"
import DetailsPage from "./pages/DetailsPage/index"
import createHistory from 'history/createBrowserHistory';


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
           <Switch>
             {/* <Route path="/" component={Page}/> */}
             <Route exact path="/tests/:id" render={(props) => <DetailsPage {...props}  />} />
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
