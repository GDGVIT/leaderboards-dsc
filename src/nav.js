import React from 'react'
import {NavLink, withRouter} from 'react-router-dom';
import {Menu} from 'antd';
import dsc from './assets/dsclogo.png';


class Nav extends React.Component{
    constructor(props){
        super(props);
        this.state={
            current: null  
        }
        console.log(this.props)
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

    render(){
        return(
            <div>
                <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                    <Menu.Item key="home" className="navz">
                        <img src={dsc} alt="dsc-vit home"></img>
                    </Menu.Item>
                    <Menu.Item key="daily">
                        <NavLink to="/daily">Daily Challenge</NavLink>
                    </Menu.Item>
                    <Menu.Item key="weekly">
                        <NavLink to="/weekly">Weekly Challenge</NavLink>
                    </Menu.Item>
                    <Menu.Item key="leaderboard">
                        <NavLink to="/leaderboard">Leaderboard</NavLink>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default withRouter(Nav);