import React from 'react'
import {withRouter} from 'react-router-dom';
import { Table, Tag } from 'antd';

const columns = [
  {
    title: 'Position',
    dataIndex: 'position',
    key: 'position',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <strong>{text}</strong>,
  },
  {
    title: 'Score',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Profile',
    key: 'action',
    render: (text, record) => (
      <span>
        <a>@SOmedude</a>
      </span>
    ),
  },
];

const data = [
  {
    key: '1',
    position: '1',
    name: 'John Brown',
    age: 130,
  },
  {
    key: '2',
    position: '2',
    name: 'Jim Green',
    age: 124,
  },
  {
    key: '3',
    position: '3',
    name: 'Joe Black',
    age: 69,
  },
];

class Leader extends React.Component{
    render(){
        return(
        <div className="form-holder">  
        <div className="formparent">   
        <div> 
        <h3>Leaderboard for today</h3>
        <Table columns={columns} dataSource={data} />
        </div>
        </div>
       
      </div>
        );
    }
}

export default withRouter(Leader);