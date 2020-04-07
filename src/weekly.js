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
            thelinks: [],
            days: '',
            hours:'',
            minutes:'',
            seconds:''
        }
    }
    log = (e) => {
        // console.log(e);
      }
    onFinish = values => {
        // console.log(values.answer_body)
        var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression);

        if (values.answer_body.match(regex)) {
            links[n] = values.answer_body;
            n += 1;
            this.setState({
                thelinks: links
            });
        } else {
        this.props.alert.show("Not a valid link");
        }
  
        // console.log(this.state.thelinks)
    }
    addTag=()=>{
        this.state.thelinks.forEach((e, i) => {
            // console.log(e, i)
        })
    }
    send = () =>{
        var sending='';
        var sentlinks = this.state.thelinks;
        // console.log(sentlinks)
        sentlinks.forEach(l=>{
            // console.log(l)
            sending+=(l+', ');
        })
        console.log(sending)
        let send = {
            'answer_body': sending,
            'answer_type': 1,
            'weekly_challenge': 1
        }
        if (sending !== ''){
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
                        this.props.alert.show("You can't submit an empty response")
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
                // console.log(data)
               this.props.alert.show(data.message)
            })
            .catch(error => {
                // console.log(error)
            });
        }else{
            this.props.alert.show("You cant submit an empty response!")
        }
        
      }

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
      componentDidMount(){
        if(localStorage.getItem("token")){
          //   console.log(".")
        }else{
            this.props.history.push("/");
        }
        setInterval(() => {
            this.showDate("April 11 2020 11:00:00 GMT+0530");
        }, 1000);
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
            <h3>Task</h3>
            <p>In normal calculators, we have a limitation on the size of numbers we can use for calculations. Develop a calculator that can be used for numbers of any size.</p>
            <Form name="Daily-form" onFinish={this.onFinish}>
            <h3>Your answer</h3>
                <Form.Item name='answer_body' className="sikebich" rules={[{required:true, message:"You can't leave this empty"}]}>
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
            <div className="timer">
            <h3>Time left: </h3>
                <p>Days: {this.state.days}</p>
                <p>, Hours: {this.state.hours}</p>
                <p>, Minutes: {this.state.minutes}</p>
                <p>, Seconds: {this.state.seconds}</p>
            </div>
          </div>

        );
    }
}

export default withAlert()(Weekly);