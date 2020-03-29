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
      };

    render(){
        return(
            <div className="form-holder">  
            <div className="formparent">   
            <div> 
            <h3>Question</h3>
            <p>How is the quarantine helping you build your skills? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, How is the quarantine helping you build your skills? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam How is the quarantine helping you build your skills? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam How is the quarantine helping you build your skills? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
            <Form name="Daily-form" onFinish={this.onFinish}>
            <h3>Your answer</h3>
                <Form.Item name={['user', 'introduction']}>
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