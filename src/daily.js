import React from 'react'
import { Form, Input, Button } from 'antd';

class Daily extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    onFinish = values => {
        console.log(values);
      };

    render(){
        return(
            <div className="form-holder">  
            <div className="formparent">   
            <div> 
            <h3>Question</h3>
            <p>How is the quarantine helping you build your skills? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</p>
            <Form name="Daily-form" onFinish={this.onFinish}>
            <h3>Your answer</h3>
                <Form.Item name={['user', 'introduction']}>
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

export default Daily;