import React from 'react'
import { Form, Input, Button } from 'antd';
import Nav from './nav';
import {withAlert} from 'react-alert';


var chal = 1;

class Daily extends React.Component{
    constructor(props){
        super(props);
        this.state={
            elems: []
        }
    }
    onFinish = values => {
        let send = {
            'answer_body': values.answer_body,
            'answer_type': 0,
            'daily_challenge': chal
        }
        let tok = localStorage.getItem("token");
        console.log(tok);
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
        }else if(response.status === 400){
            this.props.alert.show("You've already answered once!");
            console.log(response)
        }else{
            this.props.alert.show(response.statusText);
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
        if(localStorage.getItem("token") === this.props.location.state){
            console.log('.')
        }else{
            // this.props.history.push("/");
        }

        fetch('https://project-ideas-v2-backend.herokuapp.com/admin_app/latest_question/', {
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                chal = data.Question.id;
                this.setState({
                    elems: data.Question.question_body
                })
            })
            .catch(error => console.error(error))
        }
                

    render(){
        return(
            <div className="form-holder">  
        <Nav active="daily"/>

            <div className="formparent ques">   
            <div> 
            <h3>Question</h3>
            {/* <p>{this.state.elems}</p> */}
            <p>Coming soon...</p>
            <Form name="Daily-form" onFinish={this.onFinish}>
            <h3>Your answer</h3>
                <Form.Item name="answer_body">
                    <Input.TextArea placeholder="Daily challenges will begin soon"/>
                </Form.Item>

            <Form.Item className="textbtn">
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

export default withAlert()(Daily);