import React from 'react';
import { Form, Input, Button, Tag } from 'antd';
import Nav from './nav';
import {withAlert} from 'react-alert';

var links = [];
var n = 0;
class Weekly extends React.Component{
    constructor(props){
        super(props);
        this.state={
            thelinks: []
        }
    }
    log = (e) => {
        console.log(e);
      }
    onFinish = values => {
        console.log(values.answer_body)
        document.getElementById("Daily-form_answer_body").innerHTML = "";
        if(values.answer_body && values.answer_body !== ""){
            links[n] = values.answer_body;
            n += 1;
            this.setState({
                thelinks: links
            });
            console.log(this.state)
        }
    }
    addTag(){
        this.state.thelinks.map(function(i){
            console.log(i)
        return(<Tag closable>i</Tag>)

        })
        
    }
    send = () =>{
        let send = {
            'answer_body': this.state.thelinks,
            'answer_type': 1,
            'weekly_challenge': 1
        }
        let tok = localStorage.getItem("token");
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
            this.props.alert.show(response.statusText);
        }
        })
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.log(error)
        });
      }
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
          <Nav />

            <div className="formparent ques">   
            <div> 
            <h3>Question</h3>
            <p>How is the quarantine helping you build your skills? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, How is the quarantine helping you build your skills? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam How is the quarantine helping you build your skills? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam How is the quarantine helping you build your skills? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
            <Form name="Daily-form" onFinish={this.onFinish}>
            <h3>Your answer</h3>
                <Form.Item name='answer_body'>
                    <Input placeholder="Project link(s)"/>
                </Form.Item>
                <div>
                    {this.addTag()}
                </div>

            <Form.Item className="textbtn2">
                <Button type="primary" htmlType="submit">
                    Add link
                </Button>
                <Button type="primary" onClick={this.send}>
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

export default withAlert()(Weekly);