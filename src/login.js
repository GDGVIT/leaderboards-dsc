import React, {useEffect} from 'react';
import { Form, Input, Button, Menu, Tabs} from 'antd';
import {withRouter} from 'react-router-dom';
import Leader from './leader';
import dsc from './assets/dsclogo.png';
import { useAlert } from 'react-alert';
import glogo from './assets/glogo.png';
import * as firebase from "firebase";
import { ReCaptcha } from 'react-recaptcha-v3';

var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');

const Login = (props) => {
    useEffect(() => {
        if(localStorage.getItem("token")){
            props.history.push({pathname: "/leaderboard",
                                active: "leaderboard"
                                });
        }   
      });
      const alert = useAlert()
const { TabPane } = Tabs;
var recaptok="";
const verifyCallback = (recaptchaToken) => {
    // Here you will get the final recaptchaToken!!!  
    console.log(recaptchaToken, "<= your recaptcha token")
    recaptok = recaptchaToken;
  }
  const onFinish = values => {

    return fetch("https://project-ideas-v2-backend.herokuapp.com/app/normal_login/", {
        method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
        body: JSON.stringify(values), // Coordinate the body type with 'Content-Type'
        headers: new Headers({
          'Content-Type': 'application/json',
          'g-recaptcha-response': recaptok
        }),
      })
      .then(response => {
        if(response.status === 200 || response.status===201 || response.status===202){
        return response.json();
        }else{
            console.log(response)
            alert.show(response.statusText);
        }
        })
        .then(data => {
            console.log(data)
            localStorage.setItem("token", 'Token '+data.User.token);
            props.history.push("/daily");
        })
        .catch(error => {
            console.log(error);
        });
    };
  const onFinish2 = values => {

    return fetch("https://project-ideas-v2-backend.herokuapp.com/app/signup/", {
        method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
        body: JSON.stringify(values), // Coordinate the body type with 'Content-Type'
        headers: new Headers({
          'Content-Type': 'application/json',
          'g-recaptcha-response': recaptok
        }),
      })
      .then(response => {
        if(response.status === 200 || response.status===201 || response.status===202){
        return response.json();
        }else if(response.status === 400){
            alert.show("An account with this email/username already exists.");
            console.log(response)
        }else{
            alert.show(response.statusText);
        }
        })
        .then(data => {
            console.log(data);
            if(data){
                localStorage.setItem("token", 'Token '+data.User.token);
                props.history.push("/daily");
            }
        })
        .catch(error => {
            console.log(error);
        });
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };


  const gauth=(e)=>{
    if(e){
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token.
            var token = result.credential.accessToken;
            console.log(token)
            // The signed-in user info.
            var user = result.user;
            // console.log(user.uid)
            let values = {
                "username":user.uid,
                "platform":0,
                "email":user.email
            }
            fetch("https://project-ideas-v2-backend.herokuapp.com/app/login_signup/", {
                method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
                body: JSON.stringify(values), // Coordinate the body type with 'Content-Type'
                headers: new Headers({
                'Content-Type': 'application/json',
                'g-recaptcha-response': recaptok
                }),
            }).then(response => {
                if(response.status === 200 || response.status===201 || response.status===202){
                    return response.json();
                }else{
                    console.log(response)
                    alert.show(response.statusText);
                }
                })
                .then(data => {
                    console.log(data)
                    localStorage.setItem("token", 'Token '+data.User.token);
                    props.history.push({
                        pathname: "/daily",
                        state: data.User.token
                    });
                })
                .catch(error => {
                    console.log(error);
                });
           });
    }
  }



  return (
    <div className="form-holder logins" >  

    <Menu mode="horizontal">
                    <Menu.Item key="home" className="navz">
                        <img src={dsc} alt="dsc-vit home"></img>
                    </Menu.Item>
    </Menu>
    <Tabs defaultActiveKey="1">
        <TabPane tab="Leaderboard" key="1">
        <Leader />
            
        </TabPane>
        <TabPane tab="Login" key="2">
        <div className="formparent loginz">   
            <div> 
                <h3>Login</h3>
                <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>
   
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                <ReCaptcha
                    sitekey="6Lcwf-UUAAAAAOQBtsfwGEjG4Y6iEkmQqbDy1uAz"
                    action='/'
                    verifyCallback={verifyCallback}
                />
                </Form.Item>

                <Form.Item className="logincenter">
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                    <Button type="primary" className="oauth" onClick={()=>gauth(true)}>
                        Login with <img src={glogo} alt="google"></img> 
                    </Button>
                </Form.Item>
                </Form>

            </div>
        </div>
        </TabPane>
        <TabPane tab="Signup" key="3">
        <div className="formparent loginz">   
            <div> 
                <h3>Signup</h3>
                <Form
                name="basic2"
                initialValues={{ remember: true }}
                onFinish={onFinish2}
                onFinishFailed={onFinishFailed}
                >
                <Form.Item>
                <ReCaptcha
                    sitekey="6Lcwf-UUAAAAAOQBtsfwGEjG4Y6iEkmQqbDy1uAz"
                    action='/'
                    verifyCallback={verifyCallback}
                />
                </Form.Item>
                {/* <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{type: "email", required: true, message: 'Please input a valid Email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' },
                            {min: 8, message: 'Password must be atleast 8 digits!'}
                            ]}
                >
                    <Input.Password />
                </Form.Item> */}

                <Form.Item className="logincenter">
                    {/* <Button type="primary" htmlType="submit">
                    Submit
                    </Button> */}
                    <Button type="primary" className="oauth" onClick={()=>gauth(true)}>
                        Signup with <img src={glogo} alt="google"></img> 
                    </Button>
                </Form.Item>
                </Form>

            </div>
            </div>
        </TabPane>
    </Tabs>
 
        </div>
  );
};

export default withRouter(Login);