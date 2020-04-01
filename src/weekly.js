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
        // console.log(values.answer_body)
        document.getElementById("Daily-form_answer_body").innerHTML = "";
        if(values.answer_body && values.answer_body !== ""){
            links[n] = values.answer_body;
            n += 1;
            this.setState({
                thelinks: links
            });
            // console.log(this.state)
        }
    }
    addTag=()=>{
        this.state.thelinks.forEach((e, i) => {
            console.log(e, i)
        })
    }
    send = () =>{
        var sending
        var sentlinks = this.state.thelinks;
        // console.log(sentlinks)
        sentlinks.forEach(l=>{
            sending+=(l+', ');
        })
        console.log(sending)
        let send = {
            'answer_body': sending,
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
            switch(response.status){
                case 400: 
                    this.props.alert.show("You have already answered once")
                    break;
                case 401: 
                  this.props.alert.show("something's wrong. Please try again later")
                  break;
                case 403:
                  this.props.alert.show("unauthorized")
                  break;
                case 404:
                  console.log("unauthorized")
                  break;
                default:  
                  this.props.alert.show("Seems like something's wrong on our end. Please contact the developers")
              }
        }
        })
        .then(data => {
           this.props.alert.show(data.message)
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
        const { thelinks } = this.state;
        const taglist = thelinks.length ? (
            thelinks.map(
                thelink =>{
                    return(<Tag key={thelink} closable>{thelink}</Tag>)
                }
            )
        ):(
            <div>enter a link</div>
        )
        return(
            
            <div className="form-holder">  
          <Nav active="weekly"/>

            <div className="formparent ques">   
            <div> 
            <h3>Question</h3>
            <p>Coming soon</p>
            <Form name="Daily-form" onFinish={this.onFinish}>
            <h3>Your answer</h3>
                <Form.Item name='answer_body' className="sikebich" >
                    <Input placeholder="Project link(s)"/>
                </Form.Item>
                <div>
                    {taglist}
                </div>

            <Form.Item className="textbtn2">
                <Button type="primary" htmlType="submit" style={{'marginRight':'15px'}}>
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