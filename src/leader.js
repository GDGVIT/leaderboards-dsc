import React from 'react'
import {withRouter} from 'react-router-dom';
import { Table, Tag } from 'antd';
import Nav from './nav';
import trophy from './assets/trophy.png';
import silver from './assets/silver.png';
import bronze from './assets/bronze.png';
  
const { Column } = Table;


const columns = [
  {
    title: 'Position',
    dataIndex: 'position',
    key: 'position',
    render: (text,record) =>( <a>{text}</a>),
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
      leaders: [],
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
        return(<Nav active="leaderboard"/>);
      }
    }
    showimg=(v)=>{
      if(v===1){
        return(<img src={trophy} alt="gold"></img>)
      }else if(v===2){
        return(<img src={silver} alt="silver"></img>)
      }else if(v===3){
        return(<img src={bronze} alt="bronze"></img>)
      }
    }
    render(){
        return(
        <div className="form-holder">  
        {this.showNav()}
          <div className="formparent max-width-setter">   
            <div> 
              <h3>Today's Leaderboard</h3>
              <a href="#" className="share ant-btn" >Share link</a>
              <Table dataSource={this.state.leaders}>
                <Column title="Position" dataIndex="position" key="position" 
                  render={record => (
                      <span>
                        {this.showimg(record)}
                        {record}
                      </span>
                )}
                />
                <Column title="Name" dataIndex="username" key="username" />
                <Column title="Score" dataIndex="marks" key="marks" />
              </Table>
            </div>
          </div>
        </div>
        );
    }
}

export default withRouter(Leader);