import React from 'react';
import 'antd/dist/antd.css';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import './App.css';
import Daily from './daily';
import Login from './login';
import Weekly from './weekly';
import Leader from './leader';
import Nav from './nav';



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
      <div className="App">
          <Nav />
          <Route exact path='/' component={Login}/>
          <Route exact path='/daily' component={Daily}/>
          <Route exact path='/weekly' component={Weekly}/>
          <Route exact path='/leaderboard' component={Leader}/>
      </div>
      </BrowserRouter>
    );
  }
}

export default withRouter(App);
