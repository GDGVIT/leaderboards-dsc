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
  render(){
    return (
      <BrowserRouter>
      <AlertProvider template={AlertTemplate} {...options}>
      <div className="App">
          <Route exact path='/' component={Login}/>
          <Route exact path='/daily' component={Daily}/>
          <Route exact path='/weekly' component={Weekly}/>
          <Route exact path='/leaderboard' component={Leader}/>
          <Route exact path='/adminpanel' component={Admin}/>
      </div>
      </AlertProvider>
      </BrowserRouter>
    );
  }
}

export default withRouter(App);
