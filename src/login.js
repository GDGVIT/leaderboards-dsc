import React, {useEffect} from 'react';
import { Form, Input, Button, Menu, Tabs} from 'antd';
import {withRouter} from 'react-router-dom';
import Leader from './leader';
import dsc from './assets/dsclogo.png';
import { useAlert } from 'react-alert';


const Login = (props) => {
    useEffect(() => {
        if(localStorage.getItem("token")){
            props.history.push("/leaderboard");
        }   
      });
      const alert = useAlert()
const { TabPane } = Tabs;

  const onFinish = values => {

    return fetch("https://project-ideas-v2-backend.herokuapp.com/app/normal_login/", {
        method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
        body: JSON.stringify(values), // Coordinate the body type with 'Content-Type'
        headers: new Headers({
          'Content-Type': 'application/json'
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
          'Content-Type': 'application/json'
        }),
      })
      .then(response => {
        if(response.status === 200 || response.status===201 || response.status===202){
        return response.json();
        }else{
            alert.show(response.statusText);
        }
        })
        .then(data => {
            console.log(data);
            localStorage.setItem("token", 'Token '+data.User.token);
            props.history.push("/daily");
        })
        .catch(error => {
            console.log(error);
        });
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

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

                <Form.Item className="logincenter">
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                </Form.Item>
                </Form>

            </div>
        </div>
        </TabPane>
        <TabPane tab="Signup" key="3">
        <div className="formparent loginz">   
            <div> 
                <h3>Or, Signup</h3>
                <Form
                name="basic2"
                initialValues={{ remember: true }}
                onFinish={onFinish2}
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
                </Form.Item>

                <Form.Item className="logincenter">
                    <Button type="primary" htmlType="submit">
                    Submit
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