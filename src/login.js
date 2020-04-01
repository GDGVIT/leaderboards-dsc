import React, {useEffect} from 'react';
import { Form, Input, Button, Menu, Tabs} from 'antd';
import {withRouter} from 'react-router-dom';
import Leader from './leader';
import dsc from './assets/dsclogo.png';
import { useAlert } from 'react-alert';
import glogo from './assets/glogo.png';
import tlogo from './assets/twitter.png';
import gilogo from './assets/github.png';
import flogo from './assets/facebook.png';
import * as firebase from "firebase";
import { ReCaptcha } from 'react-recaptcha-v3';
import Faq from './faq';


const Login = (props) => {
    var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');
var fprovider = new firebase.auth.FacebookAuthProvider();
fprovider.addScope('id');
fprovider.addScope('name');
fprovider.addScope('email');
var tprovider = new firebase.auth.TwitterAuthProvider();
var gprovider = new firebase.auth.GithubAuthProvider();
gprovider.addScope('email');

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
  


  const gauth=(e)=>{
    if(e){
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token.
            var token = result.credential.accessToken;
            // console.log(token)
            // The signed-in user info.
            var user = result.user;
            console.log(user)
            postform(user);
            
    }).catch(function(error){
        var errorCode = error.code;
            // console.log('errorCode', errorCode)
            var errorMessage = error.message;
            // console.log('errormsg', errorMessage)
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
    });
        }
  }

  const fauth=(e)=>{
    if(e){
        firebase.auth().signInWithPopup(fprovider).then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(user)
            postform(user);

            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            console.log('errorCode', errorCode)
            var errorMessage = error.message;
            console.log('errormsg', errorMessage)
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
        
    }
  }
  const tauth=(e)=>{
    if(e){
        firebase.auth().signInWithPopup(tprovider).then(function(result) {
            // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
            // You can use these server side with your app's credentials to access the Twitter API.
            var token = result.credential.accessToken;
            var secret = result.credential.secret;
            // The signed-in user info.
            var user = result.user;
            console.log(user)
            postform(user);

            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    }
}

const giauth=(e)=>{
    if(e){
        firebase.auth().signInWithPopup(gprovider).then(function(result) {
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(user)
            postform(user);
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
  
    }  }

    const postform = (user) =>{
        let values = {
            "username":user.displayName,
            "platform":0,
            "email":user.email,
            "platform_name":"google",
            "social_user_id":user.uid,
            "g-recaptcha-response": recaptok
        }
        fetch("https://project-ideas-v2-backend.herokuapp.com/app/login_signup/", {
            method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
            body: JSON.stringify(values), // Coordinate the body type with 'Content-Type'
            headers: new Headers({
            'Content-Type': 'application/json'
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
                    pathname: "/leaderboard",
                    state: data.User.token
                });
            })
            .catch(error => {
                console.log(error);
            });
       };
    
  return (
    <div className="form-holder logins" >  

    <Menu mode="horizontal">
                    <Menu.Item key="home" className="navz">
                       <a href="https://www.dscvit.com" target="_blank"><img src={dsc} alt="dsc-vit home"></img></a> 
                    </Menu.Item>
    </Menu>
    <Tabs defaultActiveKey="1">

        <TabPane tab="Login" key="1">
        <div className="formparent loginz">   
            <div> 
                <h3>We use Oauth to prevent abuse</h3>
                <Form
                name="basic"
                initialValues={{ remember: true }}
                >
  
                <Form.Item className="logincenter">
                <Button type="primary" className="oauth" onClick={()=>fauth(true)}>
                        Login with <img src={flogo} alt="facebook"></img> 
                </Button>
                </Form.Item>
                <Form.Item className="logincenter">
                <Button type="primary" className="oauth" onClick={()=>tauth(true)}>
                        Login with <img src={tlogo} alt="twitter"></img> 
                </Button>
                </Form.Item>
                <Form.Item className="logincenter">
                <Button type="primary" className="oauth" onClick={()=>giauth(true)}>
                        Login with <img src={gilogo} alt="github"></img> 
                </Button>
                </Form.Item>
                <Form.Item className="logincenter">
                    <Button type="primary" className="oauth" onClick={()=>gauth(true)}>
                    Login with <img src={glogo} alt="google"></img> 
                    </Button>
                </Form.Item>
                <Form.Item>
                <ReCaptcha
                    sitekey="6Lcwf-UUAAAAAOQBtsfwGEjG4Y6iEkmQqbDy1uAz"
                    action='/'
                    verifyCallback={verifyCallback}
                />
                </Form.Item>
                </Form>

            </div>
        </div>
        </TabPane>
        <TabPane tab="Leaderboard" key="2">
        <Leader />
            
        </TabPane>
        <TabPane>
            <Faq />
        </TabPane>
    </Tabs>
 
        </div>
  );
};

export default withRouter(Login);