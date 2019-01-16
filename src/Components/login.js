import React, { Component } from "react";
import {
  Button,
  Form,
  Card
} from "semantic-ui-react";

export default class Login extends Component {
    constructor(){
        super();
        this.state={
            login :{
                userName:"",
                password:""
            }
        }
    }
    handleValue =(event)=>{
        let {name,value}=event.target;
        let {login} = this.state;
        login[name]=value;
        this.setState({login});
    }
  render() {
      let {
        userName,
        password
      } = this.state.login;
    return (
      <Card>
        <Card.Content>
          <Card.Header>Login</Card.Header>
        </Card.Content>
        <Card.Content>
          <Card.Description>
            <Form
            onSubmit ={this.submitData}
            >
              <Form.Field required>
                <label>User Name</label>
                <input placeholder="User Name" name="userName" value={userName} onChange={this.handleValue}  />
              </Form.Field>
              <Form.Field requireds>
                <label>Password</label>
                <input type="password" name="password" value={password} onChange={this.handleValue} placeholder="Last Name" />
              </Form.Field>
              <Button type="submit">Submit</Button>
            </Form>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}
