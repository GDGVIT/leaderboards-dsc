import React from 'react';
import { Form, Input, Button, Tag } from 'antd';


class Weekly extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    log = (e) => {
        console.log(e);
      }
    onFinish = values => {
        console.log(values);
        let send = {
            'answer_body': values.answer_body,
            'answer_type': 1,
            'weekly_challenge': 1
        }
        let tok = localStorage.getItem("token");
        console.log(values);
        return fetch("https://project-ideas-v2-backend.herokuapp.com/admin_app/answer/", {
        method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
        body: JSON.stringify(send), // Coordinate the body type with 'Content-Type'
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': tok
        }),
      })
      .then(response => {
        if(response.status === 200 || response.status===201 || response.status===202){
        return response.json();
        }else{
            alert(response.status);
        }
        })
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.log(error)
        });
      };
      componentDidMount(){
          if(localStorage.getItem("token")){
              console.log(".")
          }else{
              this.props.history.push("/");
          }
      }

    render(){
        return(
            <div className="form-holder">  
            <div className="formparent ques">   
            <div> 
            <h3>Question</h3>
            <p>How is the quarantine helping you build your skills? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, How is the quarantine helping you build your skills? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam How is the quarantine helping you build your skills? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam How is the quarantine helping you build your skills? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
            <Form name="Daily-form" onFinish={this.onFinish}>
            <h3>Your answer</h3>
                <Form.Item name='answer_body'>
                    <Input.TextArea placeholder="Give a short answer. Write about what you want to implement"/>
                </Form.Item>
                <div>
                    <Tag closable onClose={this.log}>
                    github.com/AshDarkfold
                    </Tag>
                </div>

            <Form.Item className="textbtn2">
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
            </Form>
            </div>
            </div>
          </div>

        );
    }
}

export default Weekly;