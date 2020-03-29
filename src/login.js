import React, {useEffect} from 'react';
import { Form, Input, Button} from 'antd';
import {withRouter} from 'react-router-dom';


const Login = (props) => {
    useEffect(() => {
        if(localStorage.getItem("token")){
            props.history.push("/daily");
        }   
      });

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
            alert(response.status);
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
            alert(response.status);
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
    <div className="form-holder">  
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
    </div>
  );
};

export default withRouter(Login);