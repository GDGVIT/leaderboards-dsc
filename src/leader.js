import React from 'react'
import {withRouter} from 'react-router-dom';
import { Table, Tag } from 'antd';
import Nav from './nav';

const columns = [
  {
    title: 'Position',
    dataIndex: 'position',
    key: 'position',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Name',
    dataIndex: 'username',
    key: 'username',
    render: text => <strong>{text}</strong>,
  },
  {
    title: 'Score',
    dataIndex: 'marks',
    key: 'marks',
  },
];


class Leader extends React.Component{
  constructor(props){
    super(props);
    this.state={
      leaders: []
    }
  }
  componentDidMount(){
    fetch('https://project-ideas-v2-backend.herokuapp.com/admin_app/leaderboard_view/', {
      })
      .then(response => response.json())
      .then(data2 => {
        console.log(data2.message)
        this.setState({
          leaders: data2.message
        })
      })
      .catch(error => console.error(error));
    }

    showNav = () => {
      if(this.props.location.pathname !== '/'){
        return(<Nav />);
      }
    }
    render(){
        return(
        <div className="form-holder">  
        {this.showNav()}
          <div className="formparent">   
            <div> 
              <h3>Leaderboard for today</h3>
              <a href="#" className="share ant-btn" >Share link</a>
              <Table columns={columns} dataSource={this.state.leaders} />
            </div>
          </div>
        </div>
        );
    }
}

export default withRouter(Leader);