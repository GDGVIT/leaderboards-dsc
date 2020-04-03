import React from 'react';
import {Button, Input, Form, Table, InputNumber} from 'antd';
import {withAlert} from 'react-alert';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const url = "https://project-ideas-v2-backend.herokuapp.com/";
const { Dragger } = Upload;

class Admin extends React.Component{

    constructor(props){
        super(props);
        this.state={
            querydq: "",
            cu: null,
            ans: [],
            unevans: [],
        }
    }
    quer = null;
    logout = () =>{
        fetch(url + "admin_app/logout/", {
            headers: new Headers({
                'Authorization': localStorage.getItem("admintoken")
                })
        })
        .then(response => response.json())
        .then(data => {
            localStorage.removeItem("admintoken")
            this.props.history.push("/adminlogin")
        })
        .catch(error => console.error(error))
    }
    componentDidMount(){
        if(this.props.location.state !== localStorage.getItem("admintoken")){
            this.props.history.push("/adminlogin")
        }
        this.setState({
            cu: localStorage.getItem("admintoken")
        })
        fetch(url+'admin_app/all_answers/', {
            headers: new Headers({
                'Authorization': localStorage.getItem("admintoken")
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({
                    ans: data.message
                })
            })
            .catch(error => console.error(error));

            fetch(url+'admin_app/unevaluated_answers/', {
                headers: new Headers({
                    'Authorization': localStorage.getItem("admintoken")
                    })
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.setState({
                        unevans: data.message
                    })
                })
                .catch(error => console.error(error))

             fetch('https://project-ideas-v2-backend.herokuapp.com/admin_app/latest_question/', {
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.setState({
                        elems: data.Question
                    })
                })
                .catch(error => console.error(error))
    }
  
        
    

    onFinish1=(v)=>{
        fetch(url+"admin_app/question/", {
            method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
            body: JSON.stringify(v), // Coordinate the body type with 'Content-Type'
            headers: new Headers({
              'Content-Type': 'application/json',
              'Authorization': this.state.cu
            }),
        })
        .then(response => response.json())
        .then(data => {
            this.props.alert.show("Question added")
        console.log(data) // Prints result from `response.json()` in getRequest
        })
        .catch(error => console.error(error))
    }
        handleQuery1=(e)=>{
            e.persist();    
            this.quer = e.target.value;
            console.log(this.quer)
        }
        propz = {
            name: 'file',
            multiple: true,
            action: url+'admin_app/excel_sheet_upload/',
            headers: ({'Authorization': localStorage.getItem("admintoken")}),
            data: JSON.stringify(this.quer),
            onChange(info) {
                console.log(info)
              const { status } = info.file;
              if (status !== 'uploading') {
                console.log(info.file, info.fileList);
              }
              if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
              } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
              }
            },
          };

          onFinishMarks=(v)=>{
            fetch(url+"admin_app/give_marks/", {
                method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
                body: JSON.stringify(v), // Coordinate the body type with 'Content-Type'
                headers: new Headers({
                  'Content-Type': 'application/json',
                  'Authorization': this.state.cu
                }),
            })
            .then(response => response.json())
            .then(data => {
            console.log(data) 
            this.props.alert.show(data.message)// Prints result from `response.json()` in getRequest
            })
            .catch(error => console.error(error))
          }
          coloumns = [
            {
              title: 'ans ID',
              dataIndex: 'id',
              key: 'id',
            },
            {
              title: 'type',
              dataIndex: 'answer_type',
              key: 'answer_type',
            },
            {
              title: 'weekly?',
              dataIndex: 'weekly_challenge',
              key: 'weekly_challenge',
            },
            {
                title: 'Answer',
                dataIndex: 'answer_body',
                key: 'answer_body',
              },
              {
                title: 'marks',
                dataIndex: 'marks',
                key: 'marks',
              },
              {
                title: 'daily_challenge?',
                dataIndex: 'daily_challenge',
                key: 'daily_challenge',
              },          
               {
                title: 'user_id',
                dataIndex: 'user_id',
                key: 'user_id',
              },
            ];
            anscol = [
                {
                    title: 'ans ID',
                    dataIndex: 'id',
                    key: 'id',
                  },
                  {
                    title: 'Answer',
                    dataIndex: 'answer_body',
                    key: 'answer_body',
                  },
            ]
            
    render(){                
        return(
            <div>
                <div className="admin">
                    <Button onClick={this.logout}>Logout</Button>
                    <div>
                        <Input placeholder="day number" onChange={this.handleQuery1}/>
                        <Dragger {...this.propz}>
                            <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">
                                Upload daily question excel sheet. single or bulk upload supported.
                            </p>
                        </Dragger>
                    </div>
                    <div>
                        <Form onFinish={this.onFinish1}>
                            <Form.Item name="question_body">
                                <Input placeholder="Daily Question"/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">Submit</Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div>
                    <h2>All Answers</h2>
                    <Table columns={this.coloumns} dataSource={this.state.ans}/>
                    <h2>unevaluated answers</h2>
                    <Table columns={this.anscol} dataSource={this.state.unevans}/>
                    </div>
                    <div>
                    <Form onFinish={this.onFinishMarks}>
                            <Form.Item name="marks"
                            rules={[{
                                type: 'number', message: 'input a number!'
                            }]}>
                                <InputNumber placeholder="Input marks "/>
                            </Form.Item>
                            <Form.Item name="answer_id">
                                <Input placeholder="Input answer id"/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">Submit</Button>
                            </Form.Item>
                    </Form>
                    </div>
                    <div>
                        {/* <h2>Filter answer by date</h2> */}
                    </div>
                </div>  
            </div>
        );
}
}

export default withAlert()(Admin);
