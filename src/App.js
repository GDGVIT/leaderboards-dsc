import React from 'react';
import 'antd/dist/antd.css';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import './App.css';
import Daily from './daily';
import Login from './login';
import Weekly from './weekly';
import Leader from './leader';
import Nav from './nav';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Admin from './admin.js';
import Adminlogin from './adminlogin.js';
import Faq from './faq.js'
import * as firebase from "firebase";
import firebaseConfig from './firebase.config';
import { loadReCaptcha } from 'react-recaptcha-v3';

firebase.initializeApp(firebaseConfig);

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      showNav: false
    }
}
  componentDidUpdate(){
    if(this.props.location.pathname !== "/"){
      this.setState({
        showNav: true
      })
    }
  }
  componentDidMount(){
    loadReCaptcha("6Lcwf-UUAAAAAOQBtsfwGEjG4Y6iEkmQqbDy1uAz");
  }
  render(){
    return (
      <BrowserRouter>
      <AlertProvider template={AlertTemplate} {...options}>
      <div className="App">
          <Route exact path='/' component={Login}/>
          <Route exact path='/daily' component={Daily}/>
          <Route exact path='/weekly' component={Weekly}/>
          <Route exact path='/leaderboard' component={Leader}/>
          <Route exact path='/faq' component={Faq}/>
          <Route exact path='/adminpanel' component={Admin}/>
          <Route exact path='/adminlogin' component={Adminlogin}/>
      </div>
      </AlertProvider>
      </BrowserRouter>
    );
  }
}

export default withRouter(App);
