import React from 'react'
import {NavLink, withRouter} from 'react-router-dom';
import {Menu} from 'antd';
import dsc from './assets/dsclogo.png';
import {compose} from 'recompose';
import { withAlert } from 'react-alert';

class Nav extends React.Component{
    constructor(props){
        super(props);
        this.state={
            current: props.active  
        }
    }
    componentDidMount(){
        this.setState({
            current: this.props.location.pathname  
        })
    }

    handleClick = e => {
        console.log('click ', e);
        if(e.key === "home"){
            window.location='http://www.dscvit.com';
        }else{
            this.setState({
            current: e.key,
            });
        }
      };
      logout=()=>{
          localStorage.removeItem("token");
            this.props.history.push("/");
      }
        showalert=()=>{
            alert("Coming soon")
        }
    render(){
        return(
            <div>
                <Menu onClick={this.handleClick} selectedKeys={this.state.current} mode="horizontal">
                    <Menu.Item key="home" className="navz">
                        <img src={dsc} alt="dsc-vit home"></img>
                    </Menu.Item>
                    <Menu.Item key="leaderboard">
                        <NavLink to="/leaderboard">Leaderboard</NavLink>
                    </Menu.Item>
                    <Menu.Item key="daily" disabled onClick={this.showalert}>
                        <NavLink to="/daily">Daily Challenge</NavLink>
                    </Menu.Item>
                    <Menu.Item key="weekly" disabled onClick={this.showalert}>
                        <NavLink to="/weekly">Weekly Challenge</NavLink>
                    </Menu.Item>
                    <Menu.Item key="faq">
                        <NavLink to="/faq">FAQ</NavLink>
                    </Menu.Item>
                    <Menu.Item key="logout">
                        <a href="" onClick={this.logout}> Logout </a>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default withRouter(Nav);