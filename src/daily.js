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
        // console.log(tok  );
        return fetch("https://project-ideas-v2.herokuapp.com/admin_app/answer/", {
        method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
        body: JSON.stringify(send), // Coordinate the body type with 'Content-Type'
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': tok
        }),
      })
      .then(response => {
        if(response.status === 200 || response.status===201 || response.status===202){
            this.props.alert.show("Answer saved")
        return response.json();
        }else if(response.status === 400){
            this.props.alert.show("You've already answered once!");
            // console.log(response)
        }else{
            switch(response.status){
                case 401: 
                  this.props.alert.show("something's wrong. Please try again later")
                  break;
                case 403:
                  this.props.alert.show("Unauthorized. Please log in again and try")
                  break;
                case 404:
                    this.props.alert.show("Unauthorized. Please log in again and try")
                    break;
                default:  
                  this.props.alert.show("Seems like something's wrong on our end. Please contact the developers")
              }
        }
        })
        .then(data => {
            // console.log(data)
        })
        .catch(error => {
            console.log(error)
        });
    };
    showDate=(endtime)=>{
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor( (t/1000) % 60 );
        var minutes = Math.floor( (t/1000/60) % 60 );
        var hours = Math.floor( (t/(1000*60*60)) % 24 );
        var days = Math.floor( t/(1000*60*60*24) );
        
        this.setState({
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        })
      } 


    //   rep() {
    //     var str = 'Hello World';
    //     str = setCharAt(str,4,'a');
    //     alert(str);
    // }
    
    setCharAt=(str,index,chr)=>{
        if(index > str.length-1) return str;
        return str.substr(0,index) + chr + str.substr(index+1);
    }

      componentDidMount(){
        if(localStorage.getItem("token")){
            // console.log('.')
        }else{
            this.props.history.push("/");
        }

        fetch('https://project-ideas-v2.herokuapp.com/admin_app/latest_question/', {
            })
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                chal = data.Question.id;
                // console.log(data.Question.question_body)
                this.setState({
                    elems: data.Question.question_body
                })
            })
            .catch(error => console.error(error))
// console.log(new Date())
            setInterval(() => {
                let d = new Date()
                let t = d.toString()
                let n;
                d.getHours()<11?(n = parseInt(t[8]+t[9])):(n = parseInt(t[8]+t[9])+1)
                t = "May "+ n.toString() +" 2020 11:00:00 GMT+0530" 
                this.showDate(t);
            }, 1000);
        }



    render(){
        return(
            <div className="form-holder">  
        <Nav active="daily"/>
        <div className="timer">
            <h3>Time left: </h3>
                <p>Days: {this.state.days}</p>
                <p>, Hours: {this.state.hours}</p>
                <p>, Minutes: {this.state.minutes}</p>
                <p>, Seconds: {this.state.seconds}</p>
            </div>
            <div className="formparent ques">   
            <div> 
            <h3>Question</h3>
            {/* <p>Next daily question will be available on sunday 11AM</p> */}
            <p className="daily-ques">{this.state.elems}</p>
            <Form name="Daily-form" onFinish={this.onFinish}>
            <h3>Your answer</h3>
                <Form.Item name="answer_body">
                    <Input.TextArea placeholder="Give a short answer. Write about what you want to implement"/>
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